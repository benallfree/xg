import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gameCard, gameDescription, gameMeta, gameThumbnail, gameTitle } from './GameCard.css'
interface Game {
  slug: string
  url: string
  imageUrl: string
  title: string
  description: string
  author: string
  communityId: string
  githubUrl?: string
}

export function GameCard({ game }: { game: Game }) {
  return (
    <div className={gameCard}>
      <img src={game.imageUrl} alt={game.title} className={gameThumbnail} />
      <h3 className={gameTitle}>{game.title}</h3>
      <p className={gameDescription}>{game.description}</p>
      <div className={gameMeta}>
        <a href={`https://x.com/i/communities/${game.communityId}`} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>

        {game.githubUrl && (
          <a href={game.githubUrl} target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faGithub} />
            <span className="sr-only">GitHub Repository</span>
          </a>
        )}
        <a href={game.url} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faHouse} /> <span className="sr-only">Visit Website</span>
        </a>
      </div>
    </div>
  )
}
