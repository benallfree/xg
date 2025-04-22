// Cache for blob URLs to avoid recreating them
const blobCache = new Map<string, string>()

export async function createImageBlobUrl(imageUrl: string): Promise<string> {
  // Check cache first
  const cached = blobCache.get(imageUrl)
  if (cached) return cached

  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    const blobUrl = URL.createObjectURL(blob)
    blobCache.set(imageUrl, blobUrl)
    return blobUrl
  } catch (error) {
    console.error('Error creating blob URL for image:', error)
    return ''
  }
}

// Import favicon directly as a data URL
import faviconDataUrl from 'data-url:../icons/favicon-32x32.png'

export function getFaviconUrl(): string {
  console.log(`***data url`, faviconDataUrl)
  return faviconDataUrl
}
