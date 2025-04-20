import { gameCard, gameDescription, gameMeta, gameThumbnail, gameTitle } from './GameCard.css'

interface Game {
  slug: string
  url: string
  imageUrl: string
  title: string
  description: string
  author: string
  communityId: string
}

export function GameCard({ game }: { game: Game }) {
  return (
    <div className={gameCard}>
      <img src={game.imageUrl} alt={game.title} className={gameThumbnail} />
      <h3 className={gameTitle}>{game.title}</h3>
      <p className={gameDescription}>{game.description}</p>
      <div className={gameMeta}>
        <a href={`https://x.com/${game.author.replace('@', '')}`} target="_blank" rel="noopener noreferrer">
          {game.author}
        </a>
        <a href={`https://x.com/i/communities/${game.communityId}`} target="_blank" rel="noopener noreferrer">
          Join Community
        </a>
      </div>
    </div>
  )
}
