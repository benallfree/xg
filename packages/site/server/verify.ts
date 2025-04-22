interface TwitterMeta {
  card?: string
  site?: string
  title?: string
  description?: string
  image?: string
  player?: string
  playerWidth?: string
  playerHeight?: string
}

interface VerifyRequest {
  url: string
}

interface FieldValidation {
  value: string | undefined
  status: 'ok' | 'error'
  message?: string
}

interface VerifyResponse {
  success: boolean
  fields: {
    card: FieldValidation
    site: FieldValidation
    title: FieldValidation
    description: FieldValidation
    image: FieldValidation
    player: FieldValidation
  }
}

async function getTwitterMeta(url: string): Promise<TwitterMeta> {
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
      try {
        const url = new URL(value)
        if (!url.protocol || !url.host) {
          return { value, status: 'error', message: 'Image URL must be absolute' }
        }
        const response = await fetch(value)
        return response.ok
          ? { value, status: 'ok' }
          : { value, status: 'error', message: 'Image URL is not accessible' }
      } catch {
        return { value, status: 'error', message: 'Invalid URL or not absolute' }
      }

    case 'player':
      try {
        const response = await fetch(value)
        return response.ok ? { value, status: 'ok' } : { value, status: 'error', message: 'URL is not accessible' }
      } catch {
        return { value, status: 'error', message: 'Invalid URL or not accessible' }
      }

    default:
      return { value, status: 'ok' }
  }
}

export async function handleVerify(request: Request): Promise<Response> {
  const body = (await request.json()) as VerifyRequest
  const { url } = body

  if (!url) {
    return new Response(JSON.stringify({ error: 'URL is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const meta = await getTwitterMeta(url)

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
      success,
      fields,
    }

    return new Response(JSON.stringify(response), {
      status: success ? 200 : 400,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch or parse URL',
        fields: null,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }
}
