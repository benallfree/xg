/**
 * Ensures a URL uses HTTPS protocol
 */
export function ensureHttps(url: string): string {
  if (!url) return url
  return url.replace(/^http:\/\//i, 'https://')
}
