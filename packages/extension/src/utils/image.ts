// Convert external image URL to blob URL to bypass CSP
export const getImageBlobUrl = async (imageUrl: string): Promise<string> => {
  try {
    const response = await fetch(imageUrl)
    const blob = await response.blob()
    return URL.createObjectURL(blob)
  } catch (error) {
    console.error('Error converting image to blob:', error)
    return '' // Return empty string if failed
  }
}
