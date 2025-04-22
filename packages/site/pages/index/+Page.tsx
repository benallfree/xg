import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Page() {
  return (
    <div className="mx-auto p-6">
      <div className="flex flex-wrap flex-col gap-6 mt-6">
        <div className="prose">
          <p>XGames is a browser extension that allows you to play games on X.</p>
          <a
            href="https://github.com/benallfree/xg/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FontAwesomeIcon icon={faDownload} /> Install Now
          </a>
        </div>
      </div>
    </div>
  )
}
