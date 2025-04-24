// Import favicon directly as a data URL
import faviconDataUrl from 'raw:../icons/android-chrome-512x512.png'
import { ensureHttps } from './url'

// Cache for blob URLs to avoid recreating them
const blobCache = new Map<string, string>()

export async function createImageBlobUrl(imageUrl: string): Promise<string> {
  // Check cache first
  const cached = blobCache.get(imageUrl)
  if (cached) return cached

  try {
    const response = await fetch(ensureHttps(imageUrl))
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    blobCache.set(imageUrl, blobUrl)
    return blobUrl
  } catch (error) {
    console.error('Error creating blob URL for image:', error)
    return ''
  }
}

export function getFaviconUrl(): string {
  console.log(`***data url`, faviconDataUrl)
  return faviconDataUrl
}
