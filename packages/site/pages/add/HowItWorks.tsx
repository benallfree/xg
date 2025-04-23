export const HowItWorks = () => (
  <div className="bg-primary rounded p-4 overflow-x-auto text-base-content">
    <h2 className="font-semibold text-xl mb-4">How it Works</h2>
    <p className="text-base-content/80 mb-2">To add your game, you need two things:</p>
    <ol className="list-decimal list-inside space-y-2">
      <li className="text-base-content/80">Twitter Card meta tags on your game&apos;s page</li>
      <li className="text-base-content/80">
        CORS headers configured to allow access from{' '}
        <code className="px-1 py-0.5 bg-base-300 rounded">https://x.com</code> and{' '}
        <code className="px-1 py-0.5 bg-base-300 rounded">https://xg.benallfree.com</code>
      </li>
    </ol>
  </div>
)
