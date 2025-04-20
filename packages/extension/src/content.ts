import van from 'vanjs-core'

const { div, iframe } = van.tags

console.log('Xgames loaded')

// Global flag to track if game is already embedded
let isGameEmbedded = false

// Check if we're in a compatible community
const findCommunityPost = () => {
  // Only proceed if we're on a specific post URL
  if (!window.location.pathname.match(/\/[^\/]+\/status\/\d+$/)) return null

  // Look for any top-level post (not replies)
  const postText = document.querySelector('div[data-testid="tweetText"]')
  if (!postText) return null

  // Find the article element containing this post
  const article = postText.closest('article')
  if (!article) return null

  // Check if this is a top-level post by looking for reply indicators
  const isReply = article.querySelector('[data-testid="socialContext"]')
  if (isReply) return null

  return article
}

// Function to check and potentially start the game
const checkAndStartGame = () => {
  const testPost = findCommunityPost()

  // If we're not in the community anymore but the scene is active, destroy it
  if (!testPost) {
    console.log('Left community or valid post not found')
    if (westernScene) {
      westernScene.destroy()
      westernScene = null
    }
    // Remove any existing game iframes
    document.querySelectorAll('iframe').forEach((iframe) => {
      if (iframe.src === 'https://sugarglide.benallfree.com') {
        iframe.remove()
      }
    })
    isGameEmbedded = false
    return
  }

  // Start the game if we found the post and it's not already running
  if (!westernScene && !document.hidden && testPost) {
    // Remove any existing game iframes first
    document.querySelectorAll('iframe').forEach((iframe) => {
      if (iframe.src === 'https://sugarglide.benallfree.com') {
        iframe.remove()
        isGameEmbedded = false
      }
    })

    if (!isGameEmbedded) {
      console.log('Scene opened')
      playRandomDraw() // Play the draw sound when scene appears
      isGameEmbedded = true

      // Create a container for the game using VanJS
      const gameContainer = iframe({
        src: 'https://sugarglide.benallfree.com',
        style: `
          height: 400px;
          margin-left: 10px;
          margin-right: 10px;
          margin-top: 10px;
          margin-bottom: 10px;
          border: none;
          border-radius: 16px;
          overflow: hidden;
        `,
      })

      // Insert the container after the article
      testPost.parentNode?.insertBefore(gameContainer, testPost.nextSibling)

      // No need to create western scene for iframe
      westernScene = null
    }
  }
}

// Handle visibility change
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (westernScene) {
      westernScene.destroy()
      westernScene = null
    }
  } else {
    checkAndStartGame()
  }
})

// Create a mutation observer to watch for URL/content changes
const observer = new MutationObserver(() => {
  checkAndStartGame()
})

// Start observing the document for changes
observer.observe(document.body, {
  childList: true,
  subtree: true,
})

// Initial check
checkAndStartGame()
