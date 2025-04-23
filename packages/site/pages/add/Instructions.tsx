export const Instructions = () => {
  return (
    <div className="card bg-base-200 shadow-lg">
      <div className="card-body prose max-w-none">
        <h2 className="card-title mb-4">How it Works</h2>
        <p className="text-base-content/80">
          To add your game, you need to implement Twitter Card meta tags on your game&apos;s page. The page must
          include:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:card</code>
            <span>Must be set to</span>
            <code className="px-2 py-1 bg-base-300 rounded">&quot;game&quot;</code>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:site</code>
            <span>Your X (Twitter) username</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:title</code>
            <span>The title of your game</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:description</code>
            <span>A brief description of your game</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:image</code>
            <span>An absolute URL to your game&apos;s preview image</span>
          </li>
          <li className="flex items-center gap-2">
            <code className="px-2 py-1 bg-base-300 rounded">twitter:player</code>
            <span>The URL where your game can be played</span>
          </li>
        </ul>

        <div className="divider"></div>
        <h3 className="font-semibold text-lg mb-2">Example Implementation</h3>
        <pre className="bg-base-300 rounded p-4 overflow-x-auto">
          <code>{`<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="game" />
<meta name="twitter:site" content="@benallfree" />
<meta name="twitter:title" content="Sugar Glide" />
<meta
  name="twitter:description"
  content="Guide flying squirrels through the trees with their adorable baby squirrels in this fun gliding adventure!"
/>
<meta
  name="twitter:image"
  content="https://sugarglide.benallfree.com/images/splash.jpg"
/>
<meta name="twitter:player" content="https://sugarglide.benallfree.com" />
<meta name="twitter:player:width" content="1024" />
<meta name="twitter:player:height" content="576" />`}</code>
        </pre>

        <div className="divider"></div>
        <h3 className="font-semibold text-lg mb-2">CORS Requirements</h3>
        <p className="text-base-content/80">
          Your game and image URLs must have proper CORS headers to allow access from both required origins. Each origin
          will be tested separately:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span>Set</span>
            <code className="px-2 py-1 bg-base-300 rounded">Access-Control-Allow-Origin</code>
            <span>to either</span>
            <code className="px-2 py-1 bg-base-300 rounded">*</code>
            <span>or configure for both:</span>
          </li>
          <li className="ml-6">
            <code className="px-2 py-1 bg-base-300 rounded">https://x.com</code>
          </li>
          <li className="ml-6">
            <code className="px-2 py-1 bg-base-300 rounded">https://xg.benallfree.com</code>
          </li>
          <li>Both the game URL and image URL must be publicly accessible</li>
          <li>URLs must use HTTPS for security</li>
        </ul>

        <div className="divider"></div>
        <h3 className="font-semibold text-lg mb-2">Implementation Examples</h3>

        <h4 className="font-semibold">Express.js with cors package:</h4>
        <pre className="bg-base-300 rounded p-4 overflow-x-auto">
          <code>{`const express = require('express')
const cors = require('cors')
const app = express()

// Option 1: Allow all origins (easiest but least secure)
app.use(cors())

// Option 2: Allow specific origins
app.use(cors({
  origin: [
    'https://x.com',
    'https://xg.benallfree.com',
    'https://<your-domain.com>'
  ]
}))`}</code>
        </pre>

        <h4 className="font-semibold">Plain Node.js:</h4>
        <pre className="bg-base-300 rounded p-4 overflow-x-auto">
          <code>{`const http = require('http')

const ALLOWED_ORIGINS = [
  'https://x.com',
  'https://xg.benallfree.com',
  'https://<your-domain.com>'
]

http.createServer((req, res) => {
  const origin = req.headers.origin
  
  // Only set CORS header if origin is allowed
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    res.writeHead(204)
    res.end()
    return
  }

  // Your game content here
  res.writeHead(200)
  res.end('Game content')
}).listen(3000)`}</code>
        </pre>
      </div>
    </div>
  )
}
