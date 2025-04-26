// X Games Share Button Implementation
const XGames = {
  // Track initialized containers
  _initialized: new WeakSet(),

  initShareButton: function (container) {
    // Skip if already initialized
    if (this._initialized.has(container)) return

    const button = document.createElement('button')
    button.textContent = 'Share'
    container.appendChild(button)

    button.addEventListener('click', () => {
      const gameName = container.dataset.name
      const score = container.dataset.score || '0'

      // Get URL from data attribute, twitter:player meta tag, or current location
      const gameUrl =
        container.dataset.url || document.querySelector('meta[name="twitter:player"]')?.content || window.location.href

      const text = `I made it to ${score} on ${gameName}. Install @xgamesproj to play right here on X and leave a comment with your high score ${gameUrl}`

      navigator.clipboard.writeText(text).then(() => {
        button.classList.add('copied')
        const originalText = button.textContent
        button.textContent = 'Copied!'
        setTimeout(() => {
          button.classList.remove('copied')
          button.textContent = originalText
        }, 2000)
      })
    })

    // Mark as initialized
    this._initialized.add(container)
  },

  init: function () {
    // Add CSS only once
    if (!document.querySelector('#x-share-styles')) {
      const style = document.createElement('style')
      style.id = 'x-share-styles'
      style.textContent = `
          .x-share button {
            background: #1da1f2;
            color: white;
            border: none;
            padding: 2px 10px 2px 28px;
            border-radius: 12px;
            font-family: Arial, sans-serif;
            cursor: pointer;
            font-size: 12px;
            position: relative;
            transition: all 0.3s ease;
            min-width: 50px;
          }
  
          .x-share button::before {
            content: '';
            position: absolute;
            left: 6px;
            top: 50%;
            transform: translateY(-50%);
            width: 16px;
            height: 16px;
            background: url('https://xg.benallfree.com/xgames.webp') no-repeat center;
            background-size: contain;
          }
  
          .x-share button:hover {
            background: #1991db;
          }
  
          .x-share button.copied {
            background: #22c55e;
          }
        `
      document.head.appendChild(style)
    }

    // Initialize any existing share containers
    document.querySelectorAll('.x-share').forEach((container) => {
      this.initShareButton(container)
    })

    // Watch for dynamically added share containers
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            // Element node
            if (node.classList?.contains('x-share')) {
              this.initShareButton(node)
            }
            node.querySelectorAll?.('.x-share').forEach((container) => {
              this.initShareButton(container)
            })
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  },

  updateScore: function (score, containerSelector = '.x-share') {
    const container = document.querySelector(containerSelector)
    if (container) {
      container.dataset.score = score
    }
  },
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => XGames.init())
} else {
  XGames.init()
}
