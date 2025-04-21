export function Page() {
  return (
    <div className="prose max-w-none">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>Information We Collect</h2>
      <p>
        X Games does not collect any personal information directly. However, when you use our Chrome extension, we may
        collect:
      </p>
      <ul>
        <li>Browser type and version</li>
        <li>Usage statistics and interaction data with games</li>
        <li>Technical information necessary for the games to function</li>
        <li>User preferences and security settings, including which games you have allowed to run</li>
      </ul>

      <h2>How We Use Information</h2>
      <p>
        Any information collected is used solely for the purpose of providing and improving the X Games experience. We
        do not sell or share your data with third parties. Your security preferences and game permissions are stored
        locally in your browser to maintain your chosen security settings and provide a consistent experience across
        sessions.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        Our service integrates with X (formerly Twitter) and may be subject to their privacy policies when interacting
        with their platform.
      </p>

      <h2>Changes to This Policy</h2>
      <p>
        We may update this privacy policy from time to time. We will notify users of any material changes by posting the
        new privacy policy on this page.
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us through our{' '}
        <a href="https://x.com/i/communities/1914065447114396075" className="link link-primary">
          X Community
        </a>
        .
      </p>
    </div>
  )
}
