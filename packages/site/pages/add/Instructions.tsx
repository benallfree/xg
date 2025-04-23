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
        <h3 className="font-semibold text-lg mb-2">CORS Requirements</h3>
        <p className="text-base-content/80">
          Your game and image URLs must have proper CORS headers to allow access from x.com:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <span>Set</span>
            <code className="px-2 py-1 bg-base-300 rounded">Access-Control-Allow-Origin</code>
            <span>to either</span>
            <code className="px-2 py-1 bg-base-300 rounded">*</code>
            <span>or include</span>
            <code className="px-2 py-1 bg-base-300 rounded">x.com</code>
          </li>
          <li>Both the game URL and image URL must be publicly accessible</li>
          <li>URLs must use HTTPS for security</li>
        </ul>
        <div className="mt-4">
          <a
            href="https://gist.github.com/benallfree/4b690f3d0a529edf02fa9a1749d02e8a"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            View Example Implementation
          </a>
        </div>
      </div>
    </div>
  )
}
