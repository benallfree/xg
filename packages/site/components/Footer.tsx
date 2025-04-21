import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function Footer() {
  return (
    <footer className="bg-base-300 text-base-content">
      <div className="footer footer-center p-4">
        <div className="flex gap-4 items-center">
          <a
            href="https://github.com/benallfree/xg/blob/main/add.md"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-primary"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Your Game
          </a>
        </div>
      </div>
    </footer>
  )
}
