import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './style.css'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen max-w-[900px] mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <h1 className="text-xl font-semibold text-primary">
            X Games<span className="hidden">Play the latest web games directly on X</span>
          </h1>
        </div>
        <div className="navbar-end">
          <a
            href="https://x.com/i/communities/1914065447114396075"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost mr-2"
            aria-label="Connect with us on X"
          >
            <FontAwesomeIcon icon={faXTwitter} />
          </a>
          <a
            href="https://github.com/benallfree/xg/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faDownload} />
          </a>
        </div>
      </div>
      <div className="flex-grow">
        <div
          style={{
            display: 'flex',
            maxWidth: 900,
            margin: 'auto',
          }}
        >
          <Content>{children}</Content>
        </div>
      </div>
      <footer className="footer footer-center p-4 bg-base-300 text-base-content">
        <div className="flex gap-4">
          <a
            href="https://buy.polar.sh/polar_cl_kHsG7kp6B7PElpJbEO4xbzwzRMKKxIcgbN03C2zibvl"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Advertise with Us
          </a>
          <a href="/privacy" className="link link-hover">
            Privacy Policy
          </a>
          <a href="/terms" className="link link-hover">
            Terms of Service
          </a>
          <span className="text-sm opacity-75">
            What is X Games? See the{' '}
            <a
              href="https://x.com/benallfree/status/1914013553935466581"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-hover link-primary"
            >
              post that started it all
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-container" className="w-full">
      <div
        id="page-content"
        style={{
          padding: 20,
          paddingBottom: 50,
        }}
      >
        {children}
      </div>
    </div>
  )
}
