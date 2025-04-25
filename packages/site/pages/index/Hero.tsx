import { faCrown, faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Hero() {
  return (
    <div className="hero min-h-[50vh] bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-8">Play Games on X</h1>
          <p className="text-xl mb-8">X Games is a browser extension that allows you to play games on X.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://github.com/benallfree/xg/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-lg"
            >
              <FontAwesomeIcon icon={faDownload} className="mr-2" /> Install Now
            </a>
            <a href="/add" className="btn btn-secondary btn-lg" aria-label="Add Your Game">
              <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Your Game
            </a>
            <a
              href="https://buy.polar.sh/polar_cl_2OTxm1sA4VhtFBz9RIlWYkP1urmJ0v4M7AhMU0LR2X4"
              className="btn btn-accent btn-lg"
              aria-label="Get Featured"
            >
              <FontAwesomeIcon icon={faCrown} className="mr-2" /> Get Featured
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
