import { useEffect, useState } from 'react'
import { GameCard } from '../../components/GameCard'
import { container, gamesGrid } from './style.css'

interface Game {
  slug: string
  url: string
  imageUrl: string
  title: string
  description: string
  author: string
  communityId: string
}

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
      <h1>X Games</h1>
      <div className={gamesGrid}>
        {games.map((game) => (
          <GameCard key={game.url} game={game} />
        ))}
      </div>
    </div>
  )
}
