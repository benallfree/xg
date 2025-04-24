import type { TwitterMeta, XGamesResolved } from '../types'
import { saveGameMeta } from './storage'
import { ensureHttps } from './url'

// Cache map for URL resolutions
const urlResolutionCache = new Map<string, Promise<XGamesResolved | undefined>>()

// Get Twitter meta tags from URL
async function getTwitterMeta(url: string): Promise<TwitterMeta> {
  // Proceed with the actual request
  const response = await fetch(ensureHttps(url))
  const html = await response.text()

  // Handle t.co redirects
  if (url.startsWith('https://t.co/')) {
    // Try to find redirect URL in meta refresh tag
    const metaRefreshMatch = html.match(/<META[^>]*?http-equiv="refresh"[^>]*?content="[^"]*?URL=([^"]*)">/i)
    if (metaRefreshMatch) {
      const redirectUrl = ensureHttps(metaRefreshMatch[1])
      console.log('Found redirect in meta refresh:', redirectUrl)
      return getTwitterMeta(redirectUrl)
    }

    // Try to find redirect URL in location.replace
    const locationReplaceMatch = html.match(/location\.replace\("([^"]+)"\)/)
    if (locationReplaceMatch) {
      const redirectUrl = ensureHttps(locationReplaceMatch[1].replace(/\\/g, ''))
      console.log('Found redirect in location.replace:', redirectUrl)
      return getTwitterMeta(redirectUrl)
    }

    // Try to find redirect URL in title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (titleMatch && titleMatch[1].startsWith('http')) {
      const redirectUrl = ensureHttps(titleMatch[1])
      console.log('Found redirect in title:', redirectUrl)
      return getTwitterMeta(redirectUrl)
    }
  }

  const getMetaContent = (name: string): string | undefined => {
    const match = html.match(new RegExp(`<meta\\s+name="twitter:${name}"\\s+content="([^"]*)"`, 'i'))
    const content = match?.[1]
    return content && name === 'player' ? ensureHttps(content) : content
  }

  const player = getMetaContent('player')
  return {
    card: getMetaContent('card'),
    site: getMetaContent('site'),
    title: getMetaContent('title'),
    description: getMetaContent('description'),
    image: ensureHttps(getMetaContent('image') || ''),
    player: player?.includes('?') ? `${player}&embed=xgames` : player ? `${player}?embed=xgames` : undefined,
    playerWidth: getMetaContent('player:width'),
    playerHeight: getMetaContent('player:height'),
  }
}

export async function resolveUrl(url: string): Promise<XGamesResolved | undefined> {
  let resolution = urlResolutionCache.get(url)
  if (!resolution) {
    resolution = (async () => {
      try {
        const meta = await getTwitterMeta(url)
        if (meta.card !== 'game' || !meta.player) {
          return undefined
        }
        await saveGameMeta(meta.player || '', meta)
        return { isGame: true, meta }
      } catch (error) {
        console.warn(`Error resolving URL ${url}`, error)
        return
      }
    })()
    urlResolutionCache.set(url, resolution)
  }
  return resolution
}
