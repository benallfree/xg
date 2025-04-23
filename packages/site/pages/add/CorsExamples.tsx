export const CorsExamples = () => (
  <div className="bg-primary rounded p-4 overflow-x-auto text-base-content">
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
)
