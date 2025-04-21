export function Page() {
  return (
    <div className="prose max-w-none">
      <h1>Terms of Service</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>Acceptance of Terms</h2>
      <p>
        By accessing and using X Games, you accept and agree to be bound by the terms and conditions of this agreement.
      </p>

      <h2>Use License</h2>
      <p>
        X Games grants you a personal, non-exclusive, non-transferable, limited license to use our Chrome extension and
        associated services for personal entertainment purposes.
      </p>

      <h2>Restrictions</h2>
      <p>You agree not to:</p>
      <ul>
        <li>Modify or create derivative works of our games or extension</li>
        <li>Use the service for any commercial purpose</li>
        <li>Attempt to bypass any technical limitations or security measures</li>
        <li>Interfere with other users' enjoyment of the service</li>
      </ul>

      <h2>Third-Party Services</h2>
      <p>
        Our service integrates with X (formerly Twitter). Your use of X Games may also be subject to X's terms of
        service.
      </p>

      <h2>Disclaimer</h2>
      <p>
        X Games is provided "as is" without warranties of any kind, either express or implied. We do not guarantee
        uninterrupted access to our services.
      </p>

      <h2>Changes to Terms</h2>
      <p>
        We reserve the right to modify these terms at any time. Continued use of X Games after changes constitutes
        acceptance of the new terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about the Terms of Service should be directed to our{' '}
        <a href="https://x.com/i/communities/1914065447114396075" className="link link-primary">
          X Community
        </a>
        .
      </p>
    </div>
  )
}
