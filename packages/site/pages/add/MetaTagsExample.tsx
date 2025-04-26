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

    <p className="text-base-content/80 mb-4">
      We also recommend adding these Open Graph meta tags for better social sharing:
    </p>
    <ul className="space-y-2 mb-6">
      <li className="flex items-center gap-2">
        <code className="px-2 py-1 bg-base-300 rounded">og:url</code>
        <span>The URL of your game&apos;s page</span>
      </li>
      <li className="flex items-center gap-2">
        <code className="px-2 py-1 bg-base-300 rounded">og:type</code>
        <span>Set to</span>
        <code className="px-2 py-1 bg-base-300 rounded">&quot;website&quot;</code>
      </li>
      <li className="flex items-center gap-2">
        <code className="px-2 py-1 bg-base-300 rounded">og:title</code>
        <span>The title of your game</span>
      </li>
      <li className="flex items-center gap-2">
        <code className="px-2 py-1 bg-base-300 rounded">og:description</code>
        <span>A brief description of your game</span>
      </li>
      <li className="flex items-center gap-2">
        <code className="px-2 py-1 bg-base-300 rounded">og:image</code>
        <span>An absolute URL to your game&apos;s preview image</span>
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
<meta name="twitter:player:height" content="576" />

<!-- Facebook Open Graph Meta Tags -->
<meta property="og:url" content="https://sugarglide.benallfree.com" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Sugar Glide" />
<meta property="og:description" content="Guide flying squirrels through the trees with their adorable baby squirrels in this fun gliding adventure!" />
<meta property="og:image" content="https://sugarglide.benallfree.com/images/splash.jpg" />`}</code>
    </pre>
  </div>
)
