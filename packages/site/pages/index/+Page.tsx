import { useEffect, useState } from 'react'
import type { Game } from '../../../site/components/GameCard'
import { Footer } from '../../components/Footer'
import { GameCard } from '../../components/GameCard'

export default function Page() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    fetch('/whitelist.json')
      .then((res) => res.json() as Promise<{ games: Game[] }>)
      .then((data) => setGames(data.games))
      .catch((error) => console.error('Error loading games:', error))
  }, [])

  return (
    <div className="mx-auto p-6">
      <div className="flex flex-wrap justify-center gap-6 mt-6">
        {games.map((game) => (
          <GameCard key={game.url} game={game} />
        ))}
      </div>
      <Footer />
    </div>
  )
}
