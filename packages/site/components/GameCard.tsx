import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { gameCard, gameDescription, gameMeta, gameThumbnail, gameTitle } from './GameCard.css'

export interface Game {
  slug: string
  url: string
  imagePath: string
  title: string
  description: string
  xUsername: string
  xCommunityId: string
  repoUrl?: string
  githubUsername: string
}

export function GameCard({ game }: { game: Game }) {
  return (
    <div className={gameCard}>
      <img src={game.imagePath} alt={game.title} className={gameThumbnail} />
      <h3 className={gameTitle}>{game.title}</h3>
      <p className={gameDescription}>{game.description}</p>
      <div className={gameMeta}>
        <a href={`https://x.com/i/communities/${game.xCommunityId}`} target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faXTwitter} />
        </a>

        {game.repoUrl && (
          <a href={game.repoUrl} target="_blank" rel="noopener noreferrer">
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
