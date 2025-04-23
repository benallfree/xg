import { FieldValidation, GameRecord, TwitterMeta, VerifyResponse } from './types'

// Shared CORS validation function
async function validateCors(url: string, type: 'page' | 'image' | 'player'): Promise<FieldValidation> {
  try {
    const parsedUrl = new URL(url)

    if (!parsedUrl.protocol || !parsedUrl.host) {
      return { value: url, status: 'error', message: `${type} URL must be absolute` }
    }

    if (parsedUrl.protocol !== 'https:') {
      return { value: url, status: 'error', message: `${type} URL must use HTTPS` }
    }

    // Test CORS for each required origin
    const requiredOrigins = ['https://x.com', 'https://xg.benallfree.com']
    const corsResults = await Promise.all(
      requiredOrigins.map(async (origin) => {
        const headers = {
          Origin: origin,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: '0',
        }

        const response = await fetch(url, {
          method: type === 'image' ? 'GET' : 'HEAD',
          headers,
        })
        console.log({ url, headers })

        if (!response.ok) {
          return { origin, error: `URL cannot be reached (status ${response.status})` }
        }

        const corsHeader = response.headers.get('access-control-allow-origin')
        console.log({ url, corsHeader })
        if (!corsHeader) {
          return { origin, error: 'No CORS header returned' }
        }

        if (corsHeader === '*') {
          return { origin, allowed: true }
        }

        if (corsHeader !== origin) {
          return { origin, error: `Invalid CORS header: ${corsHeader}` }
        }

        return { origin, allowed: true }
      })
    )

    const failedOrigins = corsResults.filter((result) => 'error' in result)
    if (failedOrigins.length > 0) {
      // Just report the first failure
      const failure = failedOrigins[0] as { origin: string; error: string }
      return {
        value: url,
        status: 'error',
        message: `${type} URL not accessible from ${failure.origin}: ${failure.error}`,
      }
    }

    return { value: url, status: 'ok' }
  } catch (error) {
    return { value: url, status: 'error', message: 'Invalid URL or not accessible' }
  }
}

async function getTwitterMeta(url: string): Promise<TwitterMeta & { corsValidation?: FieldValidation }> {
  // First validate CORS on the main URL
  const corsValidation = await validateCors(url, 'page')
  if (corsValidation.status === 'error') {
    return {
      corsValidation,
    }
  }

  const response = await fetch(url)
  const html = await response.text()

  const getMetaContent = (name: string): string | undefined => {
    const match = html.match(new RegExp(`<meta\\s+name="twitter:${name}"\\s+content="([^"]*)"`, 'i'))
    return match?.[1]
  }

  return {
    card: getMetaContent('card'),
    site: getMetaContent('site'),
    title: getMetaContent('title'),
    description: getMetaContent('description'),
    image: getMetaContent('image'),
    player: getMetaContent('player'),
    playerWidth: getMetaContent('player:width'),
    playerHeight: getMetaContent('player:height'),
    corsValidation,
  }
}

async function validateField(name: string, value: string | undefined, meta: TwitterMeta): Promise<FieldValidation> {
  if (!value) {
    return {
      value,
      status: 'error',
      message: `Missing twitter:${name} meta tag`,
    }
  }

  switch (name) {
    case 'card':
      return value !== 'game' ? { value, status: 'error', message: 'Must be "game"' } : { value, status: 'ok' }

    case 'image':
      return await validateCors(value, 'image')

    case 'player':
      return await validateCors(value, 'player')

    default:
      return { value, status: 'ok' }
  }
}

export const inFlightVerifications = new Map<string, Promise<VerifyResponse>>()

export const makeVerifyKey = (url: string) => `verify:${url}`

export async function handleVerify(url: string, ctx: DurableObjectState, force?: boolean): Promise<VerifyResponse> {
  const cached = await ctx.storage.get<VerifyResponse>(makeVerifyKey(url))
  if (cached) {
    const now = Date.now()
    if (now - (cached.lastChecked || 0) < 1000 * 60 * 60 * 24 && !force) {
      // 24 hours
      return cached
    }
  }

  let promise = inFlightVerifications.get(url)
  if (promise) {
    return promise
  }

  promise = (async (): Promise<VerifyResponse> => {
    if (!url) {
      return {
        verified: false,
        error: 'URL is required',
      }
    }

    try {
      const meta = await getTwitterMeta(url)

      // If CORS validation failed, return that error
      if (meta.corsValidation?.status === 'error') {
        return {
          verified: false,
          error: meta.corsValidation.message,
          fields: {
            card: { value: undefined, status: 'error', message: 'CORS validation failed' },
            site: { value: undefined, status: 'error', message: 'CORS validation failed' },
            title: { value: undefined, status: 'error', message: 'CORS validation failed' },
            description: { value: undefined, status: 'error', message: 'CORS validation failed' },
            image: { value: undefined, status: 'error', message: 'CORS validation failed' },
            player: { value: undefined, status: 'error', message: 'CORS validation failed' },
          },
        }
      }

      const fields = {
        card: await validateField('card', meta.card, meta),
        site: await validateField('site', meta.site, meta),
        title: await validateField('title', meta.title, meta),
        description: await validateField('description', meta.description, meta),
        image: await validateField('image', meta.image, meta),
        player: await validateField('player', meta.player, meta),
      }

      const success = Object.values(fields).every((field) => field.status === 'ok')

      const response: VerifyResponse = {
        verified: success,
        fields,
        lastChecked: Date.now(),
      }

      if (success) {
        const key = makeVerifyKey(url)
        await ctx.storage.put<GameRecord>(key, {
          card: fields.card.value!,
          site: fields.site.value!,
          title: fields.title.value!,
          description: fields.description.value!,
          image: fields.image.value!,
          player: fields.player.value!,
          featuredAt: 0,
        })
      }

      return response
    } catch (error) {
      console.error(error)
      return {
        verified: false,
        lastChecked: Date.now(),
        error: 'Failed to fetch or parse URL',
      }
    } finally {
      inFlightVerifications.delete(url)
    }
  })()

  inFlightVerifications.set(url, promise)
  return promise
}
