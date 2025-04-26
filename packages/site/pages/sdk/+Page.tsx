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

      <h2>Benefits of Integration</h2>
      <ul>
        <li>Increase game visibility through social sharing</li>
        <li>Higher reach potential as X's algorithm favors posts that keep users on the platform</li>
        <li>Players can try your game directly within X without leaving the platform</li>
        <li>Foster competition between players</li>
        <li>Build community around your game</li>
        <li>Seamless integration with X's platform</li>
        <li>Consistent sharing experience across all X Games</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Integration requires just three simple steps:</p>
      <ol>
        <li>Add social media meta tags for proper X card display</li>
        <li>Include the share button in your game UI</li>
        <li>Import the SDK script</li>
      </ol>

      <h2>1. Add Meta Tags (Server-Side)</h2>
      <p>
        These meta tags enable rich game previews when shared on X. They must be added server-side for social media
        crawlers to see them. The twitter:player URL will also be used in the share message.
      </p>
      <CodeBlock
        language="html"
        code={`<!-- Facebook Meta Tags -->
<meta property="og:url" content="https://[YOUR-DOMAIN]/[game-path]/" />
<meta property="og:type" content="website" />
<meta property="og:title" content="[Game Name]" />
<meta property="og:description" content="[Game Description]" />
<meta property="og:image" content="https://[YOUR-DOMAIN]/[game-path]/screenshot.webp" />

<!-- Twitter Meta Tags -->
<meta name="twitter:card" content="game" />
<meta name="twitter:site" content="@[YOUR-HANDLE]" />
<meta property="twitter:domain" content="[YOUR-DOMAIN]" />
<meta property="twitter:url" content="https://[YOUR-DOMAIN]/[game-path]/" />
<meta name="twitter:title" content="[Game Name]" />
<meta name="twitter:description" content="[Game Description]" />
<meta name="twitter:image" content="https://[YOUR-DOMAIN]/[game-path]/screenshot.webp" />
<meta name="twitter:player" content="https://[YOUR-DOMAIN]/[game-path]" />
<meta name="twitter:player:width" content="1024" />
<meta name="twitter:player:height" content="576" />`}
      />

      <h2>2. Add Share Button</h2>
      <p>Place the share button component where you want it to appear:</p>
      <CodeBlock
        language="html"
        code={`<div class="x-share" data-name="Your Game Name" data-score="0 points"></div>`}
      />

      <h3>Configuration Options</h3>
      <p>The share button supports these data attributes:</p>
      <ul>
        <li>
          <code>data-name</code>: Your game's name (required)
        </li>
        <li>
          <code>data-url</code>: Override the default share URL (defaults to twitter:player meta tag URL)
        </li>
        <li>
          <code>data-score</code>: Initial achievement/score (defaults to "0")
        </li>
      </ul>

      <p>
        <strong>Important</strong>: Always initialize <code>data-score</code> with a meaningful starting value that
        matches your game's scoring format. This ensures the share button shows the correct score before the first score
        update occurs.
      </p>

      <p>Common placement examples:</p>
      <CodeBlock
        language="html"
        code={`<!-- Top-left corner -->
<div class="x-share" data-name="Game Name" data-score="0 points" style="position: absolute; left: 80px; top: 4px;"></div>

<!-- Next to score display -->
<div style="display: flex; align-items: center; gap: 10px;">
  <div id="score">Score: 0</div>
  <div class="x-share" data-name="Game Name" data-score="0 points"></div>
</div>

<!-- In game menu -->
<div class="menu">
  <h2>Game Menu</h2>
  <div class="x-share" data-name="Game Name" data-score="Level 1"></div>
  <button>Restart</button>
  <button>Settings</button>
</div>`}
      />

      <h2>3. Import SDK</h2>
      <p>Add the SDK script to your HTML file. The script will automatically:</p>
      <ul>
        <li>Initialize when the DOM is ready</li>
        <li>Handle dynamically added share buttons</li>
        <li>Use the twitter:player URL for sharing (unless overridden by data-url)</li>
        <li>Work with frameworks and dynamic content</li>
        <li>Use clipboard API for sharing</li>
        <li>Work without jQuery dependency</li>
      </ul>
      <CodeBlock language="html" code={`<script src="https://xg.benallfree.com/xgames.js"></script>`} />

      <h2>Updating Game Progress</h2>
      <p>
        Update the share content whenever the player's progress changes. The score format should match what makes sense
        for your game:
      </p>
      <ul>
        <li>Use "points" suffix for arcade/action games</li>
        <li>Use "Level X" prefix for progression-based games</li>
        <li>Use "$" prefix for financial/economy games</li>
        <li>Use appropriate units that give context (e.g. "waves", "kills", etc.)</li>
      </ul>

      <CodeBlock
        language="javascript"
        code={`// Include units in the score for clear context
XGames.updateScore('1000 points') // for points-based games
XGames.updateScore('Level 5') // for level-based games
XGames.updateScore('$5000') // for money-based games

// If you have multiple share buttons, specify which one:
XGames.updateScore('Level 5', '#specific-share-button')`}
      />

      <h2>Share Message Format</h2>
      <p>
        When players share their achievements, the SDK automatically formats the message. The URL used in the share
        message is taken from:
      </p>
      <ol>
        <li>
          <code>data-url</code> attribute if specified
        </li>
        <li>
          <code>twitter:player</code> meta tag if present
        </li>
        <li>Falls back to current window location</li>
      </ol>
      <CodeBlock
        language="text"
        code={`I reached [score with units] on [GameName]. Install @xgamesproj to play right here on X and leave a comment with your high score [game-url]`}
      />

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
  <!-- Facebook Meta Tags -->
  <meta property="og:url" content="https://[YOUR-DOMAIN]/astray/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Astray - 3D Maze Game" />
  <meta property="og:description" content="Navigate through an immersive 3D maze using arrow keys or vim controls. A challenging HTML5 game that tests your spatial awareness and reflexes." />
  <meta property="og:image" content="https://[YOUR-DOMAIN]/astray/screenshot.webp" />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="game" />
  <meta name="twitter:site" content="@[YOUR-HANDLE]" />
  <meta property="twitter:domain" content="[YOUR-DOMAIN]" />
  <meta property="twitter:url" content="https://[YOUR-DOMAIN]/astray/" />
  <meta name="twitter:title" content="Astray - 3D Maze Game" />
  <meta name="twitter:description" content="Navigate through an immersive 3D maze using arrow keys or vim controls. A challenging HTML5 game that tests your spatial awareness and reflexes." />
  <meta name="twitter:image" content="https://[YOUR-DOMAIN]/astray/screenshot.webp" />
  <meta name="twitter:player" content="https://[YOUR-DOMAIN]/astray" />
  <meta name="twitter:player:width" content="1024" />
  <meta name="twitter:player:height" content="576" />

  <script src="https://[YOUR-DOMAIN]/xgames.js"></script>
</head>

<body>
  <!-- Position next to level display -->
  <div style="position: absolute; left: 0; top: 0; display: flex; align-items: center; gap: 10px;">
    <div id="level">Level 1</div>
    <div class="x-share" data-name="Astray" data-score="Level 1"></div>
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
    </div>
  )
}
