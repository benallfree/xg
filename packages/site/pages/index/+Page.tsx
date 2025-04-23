import { useEffect, useState } from 'react'
import { GameRecord } from '../../server/types'
import { GamesGrid } from './GamesGrid'
import { Hero } from './Hero'

export default function Page() {
  const [games, setGames] = useState<GameRecord[]>([])

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data as GameRecord[]))
  }, [])

  return (
    <div className="min-h-screen bg-base-200">
      <Hero />
      <GamesGrid games={games} />
    </div>
  )
}
