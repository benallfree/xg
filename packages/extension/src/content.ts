import van from 'vanjs-core'
import { Game } from '../../site/components/GameCard'

const { div, button, a, iframe } = van.tags

console.log('Xgames loaded')

// Types
type ApprovalStatus = 'ask' | 'always' | 'never'

interface CommunityPreference {
  approvalStatus: ApprovalStatus
}

let currentGameContainer: HTMLElement | null = null
let games: Promise<Game[]> = Promise.resolve([])

// Fetch and cache whitelist
const loadWhitelist = async () => {
  const response = await fetch('https://xg.benallfree.com/whitelist.json')
  if (!response.ok) throw new Error('Failed to fetch whitelist')
  const data = await response.json()
  games = Promise.resolve(data.games)
  games.then((games) => {
    console.log('games', games)
  })
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
    currentGameContainer.remove()
  }

  const container = div(
    {
      style: `
        margin: 10px;
        padding: 10px;
        border-radius: 16px;
        background: #f0f0f0;
        color: #000;
      `,
    },
    div(
      { style: 'margin-bottom: 10px;' },
      'This post contains an X Game. Please note that X Games does not maintain or verify third-party games. Be cautious of potential scams.'
    ),
    div(
      { style: 'display: flex; gap: 10px; margin-bottom: 10px;' },
      button(
        {
          onclick: () => {
            embedGame(game)
            savePreference(game.slug, 'ask')
          },
          style: 'padding: 5px 10px; border-radius: 4px; background: #0070f3; color: white; border: none;',
        },
        'Play Once'
      ),
      button(
        {
          onclick: () => {
            embedGame(game)
            savePreference(game.slug, 'always')
          },
          style: 'padding: 5px 10px; border-radius: 4px; background: #0070f3; color: white; border: none;',
        },
        'Always Play'
      ),
      button(
        {
          onclick: () => {
            savePreference(game.slug, 'never')
            container.remove()
          },
          style: 'padding: 5px 10px; border-radius: 4px; background: #ff4444; color: white; border: none;',
        },
        'Never Play'
      )
    )
  )

  currentGameContainer = container
  article.parentNode?.insertBefore(container, article.nextSibling)
}

// Embed the game iframe
const embedGame = (game: Game) => {
  if (!currentGameContainer) return

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
      href: 'https://github.com/benallfree/xg/discussions/categories/q-a',
      target: '_blank',
      style: 'display: inline-block; margin-top: 10px; color: #666; text-decoration: underline;',
    },
    'Report an issue'
  )

  currentGameContainer.innerHTML = ''
  currentGameContainer.appendChild(gameFrame)
  currentGameContainer.appendChild(reportButton)
}

// Main function to check and handle game embedding
const checkAndHandleGame = async () => {
  const communityId = getCommunityId()
  console.log('communityId', communityId)
  if (!communityId) return

  try {
    const gamesList = await games
    const game = gamesList.find((g: Game) => g.communityId === communityId)
    if (!game) return

    console.log('found matching game', game)

    const article = document.querySelector('article')
    if (!article) return

    const preference = await getPreference(game.slug)

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
