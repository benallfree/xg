import { CodeBlock } from '../../components/CodeBlock'

export function Page() {
  return (
    <div className="prose max-w-none">
      <h1>X Games SDK Integration Guide</h1>
      <p>
        The X Games SDK enables seamless integration between games and the X (formerly Twitter) platform. It provides a
        standardized way for games to share achievements, scores, and progress directly on X, fostering community
        engagement and competition.
      </p>

      <h2>Overview</h2>
      <p>The SDK is designed to enhance the gaming experience by:</p>
      <ul>
        <li>Enabling one-click sharing of game achievements to X</li>
        <li>Providing consistent branding and user experience across all integrated games</li>
        <li>Supporting dynamic score/level updates during gameplay</li>
        <li>Facilitating discovery of other games in the X Games ecosystem</li>
        <li>Creating a bridge between X's social features and gaming achievements</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Integration requires just three simple steps:</p>
      <ol>
        <li>Add social media meta tags for proper X card display</li>
        <li>Include the share button in your game UI</li>
        <li>Import the SDK script</li>
      </ol>

      <h2>1. Add Meta Tags (Server-Side)</h2>
      <p>These meta tags enable rich game previews when shared on X:</p>
      <CodeBlock
        language="html"
        code={`<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://gfiles.benallfree.com/[game-path]/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="[Game Name]" />
<meta property="og:description" content="[Game Description]" />
<meta property="og:image" content="https://gfiles.benallfree.com/[game-path]/screenshot.webp" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="game" />
<meta name="twitter:site" content="@benallfree" />
<meta property="twitter:domain" content="gfiles.benallfree.com" />
<meta property="twitter:url" content="https://gfiles.benallfree.com/[game-path]/" />
<meta name="twitter:title" content="[Game Name]" />
<meta name="twitter:description" content="[Game Description]" />
<meta name="twitter:image" content="https://gfiles.benallfree.com/[game-path]/screenshot.webp" />
<meta name="twitter:player" content="https://gfiles.benallfree.com/[game-path]" />
<meta name="twitter:player:width" content="1024" />
<meta name="twitter:player:height" content="576" />`}
      />

      <h2>2. Add Share Button</h2>
      <p>Place the share button component where you want it to appear:</p>
      <CodeBlock language="html" code={`<div class="x-share" data-game-name="Your Game Name"></div>`} />

      <p>Common placement examples:</p>
      <CodeBlock
        language="html"
        code={`<!-- Top-left corner -->
<div class="x-share" data-game-name="Game Name" style="position: absolute; left: 80px; top: 4px;"></div>

<!-- Next to score display -->
<div style="display: flex; align-items: center; gap: 10px;">
  <div id="score">Score: 0</div>
  <div class="x-share" data-game-name="Game Name"></div>
</div>

<!-- In game menu -->
<div class="menu">
  <h2>Game Menu</h2>
  <div class="x-share" data-game-name="Game Name"></div>
  <button>Restart</button>
  <button>Settings</button>
</div>`}
      />

      <h2>3. Import SDK</h2>
      <p>Add the SDK script to your HTML file:</p>
      <CodeBlock language="html" code={`<script src="https://xg.benallfree.com/xgames.js"></script>`} />

      <h2>Updating Game Progress</h2>
      <p>Update the share content whenever the player's progress changes:</p>
      <CodeBlock
        language="javascript"
        code={`XGames.updateScore('Level 5') // or 'Score 1000', etc.

// If you have multiple share buttons, specify which one:
XGames.updateScore('Level 5', '#specific-share-button')`}
      />

      <h2>Share Message Format</h2>
      <p>
        When players share their achievements, the SDK automatically formats the message to highlight their
        accomplishment while promoting the X Games platform:
      </p>
      <CodeBlock
        language="text"
        code={`I made it to [achievement] on [GameName]. Install @xgamesproj to play right here on X and leave a comment with your high score [game-url]`}
      />

      <h2>Configuration Options</h2>
      <p>The share button supports these data attributes:</p>
      <ul>
        <li>
          <code>data-game-name</code>: Your game's name (required)
        </li>
        <li>
          <code>data-game-url</code>: Override the default share URL
        </li>
        <li>
          <code>data-score</code>: Initial achievement/score
        </li>
      </ul>

      <h2>Required Assets</h2>
      <ul>
        <li>
          <code>screenshot.webp</code> - Game screenshot for X Card preview (1024x576px recommended)
        </li>
      </ul>

      <h2>Example Implementation</h2>
      <p>Here's a complete example using the Astray game:</p>
      <CodeBlock
        language="html"
        code={`<!-- In your HTML template -->
<head>
  <meta name="twitter:card" content="game" />
  <meta name="twitter:site" content="@benallfree" />
  <meta name="twitter:title" content="Astray - 3D Maze Game" />
  <meta name="twitter:description" content="Navigate through an immersive 3D maze using arrow keys or vim controls. A challenging HTML5 game that tests your spatial awareness and reflexes." />
  <meta name="twitter:image" content="https://gfiles.benallfree.com/astray/screenshot.webp" />
  <meta name="twitter:player" content="https://gfiles.benallfree.com/astray" />
  <meta name="twitter:player:width" content="1024" />
  <meta name="twitter:player:height" content="576" />

  <script src="https://xg.benallfree.com/xgames.js"></script>
</head>

<body>
  <!-- Position next to level display -->
  <div style="position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 10px;">
    <div id="level">Level 1</div>
    <div class="x-share" data-game-name="Astray"></div>
  </div>

  <script>
    // Update score when level changes
    function updateLevel() {
      const level = Math.floor((mazeDimension - 1) / 2 - 4)
      XGames.updateScore(\`Level \${level}\`)
    }
  </script>
</body>`}
      />

      <h2>Benefits of Integration</h2>
      <ul>
        <li>Increase game visibility through social sharing</li>
        <li>Foster competition between players</li>
        <li>Build community around your game</li>
        <li>Seamless integration with X's platform</li>
        <li>Consistent sharing experience across all X Games</li>
      </ul>
    </div>
  )
}
