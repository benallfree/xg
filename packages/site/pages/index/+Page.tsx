import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import type { Game } from '../../../site/components/GameCard'
import { GameCard } from '../../components/GameCard'
import { container, gamesGrid, headerSection } from './style.css'

export default function Page() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('/whitelist.json')
      .then((res) => res.json() as Promise<{ games: Game[] }>)
      .then((data) => setGames(data.games))
      .catch((error) => console.error('Error loading games:', error))
  }, [])

  return (
    <div className={container}>
      <div className={headerSection}>
        <h1>X Games</h1>
        <a
          href="https://x.com/i/communities/1914065447114396075"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faXTwitter} /> Community
        </a>
        <a
          href="https://github.com/benallfree/xg/blob/main/add.md"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          <FontAwesomeIcon icon={faPlus} /> Add Your Game
        </a>
      </div>
      <div className="m-4">
        What is xg? See the{' '}
        <a
          href="https://x.com/benallfree/status/1914013553935466581"
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          post that started it all
        </a>
        .
      </div>
      <div className={gamesGrid}>
        {games.map((game) => (
          <GameCard key={game.url} game={game} />
        ))}
      </div>
    </div>
  )
}
