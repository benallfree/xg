import van from 'vanjs-core'
import { Game } from '../../site/components/GameCard'
import { Sponsor } from '../../site/server/sponsors'

const { div, button, a, iframe } = van.tags

console.log('Xgames loaded')

// Types
type ApprovalStatus = 'ask' | 'always' | 'never'

interface CommunityPreference {
  approvalStatus: ApprovalStatus
}

let currentGameContainer: HTMLElement | null = null
let games: Promise<Game[]> = Promise.resolve([])

// Handle URL changes
const handleUrlChange = () => {
  if (currentGameContainer) {
    currentGameContainer.remove()
    currentGameContainer = null
  }
}

// Listen for URL changes
window.addEventListener('popstate', handleUrlChange)
const originalPushState = history.pushState
history.pushState = function (...args) {
  originalPushState.apply(this, args)
  handleUrlChange()
}
const originalReplaceState = history.replaceState
history.replaceState = function (...args) {
  originalReplaceState.apply(this, args)
  handleUrlChange()
}

// Fetch and cache whitelist
const loadWhitelist = async () => {
  const response = await fetch('https://xg.benallfree.com/whitelist.json')
  if (!response.ok) throw new Error('Failed to fetch whitelist')
  const data = await response.json()
  games = Promise.resolve(data.games)
}

// Get sponsor
const getSponsor = async (): Promise<Sponsor> => {
  const response = await fetch('https://xg.benallfree.com/api/sponsor')
  if (!response.ok) {
    return { name: 'benallfree', tagline: 'Dank vibr' }
  }
  return response.json()
}

// Initial load and periodic refresh
loadWhitelist()
setInterval(loadWhitelist, 5 * 60 * 1000)

// Get community ID from page content
const getCommunityId = () => {
  const communityLink = document.querySelector('a[href*="/communities/"]')
  if (!communityLink) return null

  const match = communityLink.getAttribute('href')?.match(/\/communities\/(\d+)/)
  return match ? match[1] : null
}

// Save preference to chrome storage
const savePreference = (communityId: string, status: ApprovalStatus) => {
  chrome.storage.sync.get(['preferences'], (result: { preferences?: Record<string, CommunityPreference> }) => {
    const preferences = result.preferences || {}
    preferences[communityId] = { approvalStatus: status }
    chrome.storage.sync.set({ preferences })
  })
}

// Get preference from chrome storage
const getPreference = async (communityId: string): Promise<CommunityPreference | undefined> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get(['preferences'], (result: { preferences?: Record<string, CommunityPreference> }) => {
      resolve(result.preferences?.[communityId])
    })
  })
}

// Create game container with controls
const createGameContainer = (game: Game, article: HTMLElement) => {
  if (currentGameContainer) {
    cleanupGameContainer()
  }
  const container = div(
    {
      style: `
        margin: 10px;
        padding: 16px;
        border-radius: 12px;
        background: linear-gradient(180deg, #1a1b26 0%, #1f2937 100%);
        color: #e5e7eb;
        border: 1px solid #374151;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3), 0 0 8px rgba(88, 28, 255, 0.1);
        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
      `,
    },
    div(
      {
        style: `
          margin-bottom: 16px;
          font-size: 15px;
          line-height: 1.5;
          color: #9ca3af;
        `,
      },
      '🎮 This post contains an X Game. Please note that X Games does not maintain or verify third-party games. Be cautious of potential scams.'
    ),
    div(
      { style: 'display: flex; gap: 12px; margin-bottom: 10px;' },
      button(
        {
          onclick: () => {
            embedGame(game)
            savePreference(game.slug, 'ask')
          },
          style: `
            padding: 8px 16px;
            border-radius: 8px;
            background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
            color: white;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 0 12px rgba(79, 70, 229, 0.3);
            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 0 16px rgba(79, 70, 229, 0.4);
            }
          `,
        },
        '🎯 Play Once'
      ),
      button(
        {
          onclick: () => {
            embedGame(game)
            savePreference(game.slug, 'always')
          },
          style: `
            padding: 8px 16px;
            border-radius: 8px;
            background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
            color: white;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 0 12px rgba(79, 70, 229, 0.3);
            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 0 16px rgba(79, 70, 229, 0.4);
            }
          `,
        },
        '🚀 Always Play'
      ),
      button(
        {
          onclick: () => {
            savePreference(game.slug, 'never')
            container.remove()
          },
          style: `
            padding: 8px 16px;
            border-radius: 8px;
            background: linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%);
            color: white;
            border: none;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            box-shadow: 0 0 12px rgba(220, 38, 38, 0.2);
            &:hover {
              transform: translateY(-1px);
              box-shadow: 0 0 16px rgba(220, 38, 38, 0.3);
            }
          `,
        },
        '❌ Never Play'
      )
    )
  )

  currentGameContainer = container
  article.parentNode?.insertBefore(container, article.nextSibling)
}

// Embed the game iframe
const embedGame = async (game: Game) => {
  if (!currentGameContainer) return

  // Remove border and adjust styling for game display
  currentGameContainer.style.border = 'none'
  currentGameContainer.style.borderBottom = '1px solid #374151'
  currentGameContainer.style.borderRadius = '0'
  currentGameContainer.style.padding = '0'
  currentGameContainer.style.paddingBottom = '10px'
  currentGameContainer.style.background = 'none'
  currentGameContainer.style.boxShadow = 'none'

  const gameFrame = iframe({
    src: game.url,
    style: `
      width: 100%;
      height: 400px;
      border: none;
      border-radius: 16px;
      margin-top: 10px;
    `,
  })

  const reportButton = a(
    {
      href: `https://github.com/benallfree/xg/discussions/new?category=q-a&title=Incident report: ${game.title} [${game.xCommunityId}]&body=x.com/i/communities/${game.xCommunityId}%0A%0A@${game.githubUsername}`,
      target: '_blank',
      style: 'color: #666; text-decoration: underline;',
    },
    'Report an issue'
  )

  const sponsor = await getSponsor()
  const sponsorLink = div(
    { style: 'color: #666; font-size: 0.9em;' },
    `Sponsored by ❤️ `,
    a(
      {
        href: `https://x.com/${sponsor.name}`,
        target: '_blank',
        style: 'color: #1d9bf0',
      },
      `@${sponsor.name}`
    ),
    ` - `,
    sponsor.tagline
  )

  const linksContainer = div(
    {
      style: 'display: flex; justify-content: space-between; margin-top: 10px; margin-left: 20px; margin-right: 20px;',
    },
    sponsorLink,
    reportButton
  )

  currentGameContainer.innerHTML = ''
  currentGameContainer.appendChild(gameFrame)
  currentGameContainer.appendChild(linksContainer)
}

// Cleanup function to remove game container
const cleanupGameContainer = () => {
  if (currentGameContainer) {
    currentGameContainer.remove()
    currentGameContainer = null
  }
}

// Track current URL for navigation detection
let currentUrl = window.location.href

// Check if we're inside a comment (URL pattern: https://x.com/username/status/id)
const isInComment = () => {
  const url = window.location.href
  return /^https:\/\/(?:twitter|x)\.com\/[^\/]+\/status\/\d+/.test(url)
}

// Main function to check and handle game embedding
const checkAndHandleGame = async () => {
  const newUrl = window.location.href
  if (newUrl !== currentUrl) {
    cleanupGameContainer()
    currentUrl = newUrl
  }

  if (!isInComment()) return

  const communityId = getCommunityId()
  if (!communityId) return

  // Only proceed if we're in a comment and have a community ID

  try {
    const gamesList = await games
    const game = gamesList.find((g: Game) => g.xCommunityId === communityId)
    if (!game) return

    const article = document.querySelector('article')
    if (!article) return

    const preference = await getPreference(game.slug)

    if (currentGameContainer) return
    if (preference?.approvalStatus === 'never') return
    if (preference?.approvalStatus === 'always') {
      createGameContainer(game, article)
      embedGame(game)
    } else {
      createGameContainer(game, article)
    }
  } catch (error) {
    console.error('Error handling game:', error)
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
