import { GameContainer } from './components/GameContainer'
import { getGame } from './utils/storage'
import { resolveUrl } from './utils/urlResolver'

console.log('Xgames loaded')

const renderedLinks = new WeakSet<HTMLAnchorElement>()

const renderExternalLink = async (linkElement: HTMLAnchorElement) => {
  if (renderedLinks.has(linkElement)) return
  renderedLinks.add(linkElement)

  const parent = linkElement.parentElement
  if (!parent) return

  try {
    const result = await resolveUrl(linkElement.href)
    if (!result) return
    const playerUrl = result.meta.player
    if (!playerUrl) return

    console.log('Rendering external link', playerUrl)

    const xgame = await getGame(playerUrl)
    console.log('before GaemContainer', xgame)
    const container = GameContainer({ xgame: { meta: result.meta, preferences: xgame.preferences } })
    parent.parentNode?.insertBefore(container, parent.nextSibling)
  } catch (error) {
    console.error('Error rendering external link', linkElement.href, error)
  }
}

// Track current URL for navigation detection
let currentUrl = window.location.href

const processedLinks = new WeakSet<HTMLAnchorElement>()
// Main function to check and handle game embedding
const checkAndHandleGame = async () => {
  console.log('Checking and handling game')
  const newUrl = window.location.href
  if (newUrl !== currentUrl) {
    currentUrl = newUrl
  }

  // Process all external links that are not x.com/twitter.com
  const primaryColumn = document.querySelector('div[data-testid="primaryColumn"]')
  if (primaryColumn) {
    primaryColumn.querySelectorAll('a[href^="http"]').forEach((link) => {
      const _link = link as HTMLAnchorElement
      const href = _link.href
      // Allow t.co links but skip other twitter/x domains
      if (!href.startsWith('https://t.co/')) return
      if (processedLinks.has(_link)) return
      processedLinks.add(_link)
      renderExternalLink(_link)
    })
  }
}

// Create a mutation observer to watch for URL/content changes
const observer = new MutationObserver(() => {
  checkAndHandleGame()
})

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Initial check
checkAndHandleGame()
