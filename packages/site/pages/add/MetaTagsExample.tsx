export const MetaTagsExample = () => (
  <div className="bg-primary rounded p-4 overflow-x-auto text-base-content">
    <h3 className="font-semibold text-lg mb-2">Meta Tags</h3>
    <p className="text-base-content/80 mb-4">Your page must include these meta tags:</p>
    <ul className="space-y-2 mb-6">
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

    <h4 className="font-semibold mb-2">Example Implementation</h4>
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
  </div>
)
