import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function GameActions() {
  return (
    <div className="flex justify-center mt-8">
      <a href="/add" className="btn btn-primary">
        <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Your Game
      </a>
    </div>
  )
}
