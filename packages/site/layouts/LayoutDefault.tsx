import './style.css'

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
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
            href="https://polar.sh/checkout/polar_c_sa5Ufn66qO35xmUFs7P0AXwqoI9ssq0kPVMWM3AnHab"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Advertise with Us
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
