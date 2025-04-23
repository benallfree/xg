import { useEffect, useState } from 'react'
import { GameRecord } from '../../server/types'
import { GamesSection } from './GamesSection'
import { Hero } from './Hero'

export default function Page() {
  const [games, setGames] = useState<GameRecord[]>([])

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data as GameRecord[]))
  }, [])

  const featuredGames = games
    .filter((game) => game.featuredAt > 0)
    .sort((a, b) => (b.featuredAt || 0) - (a.featuredAt || 0))

  const nonFeaturedGames = games.filter((game) => !game.featuredAt)

  return (
    <div className="min-h-screen">
      <Hero />
      {featuredGames.length > 0 && <GamesSection title="Featured Games" games={featuredGames} />}
      <GamesSection title="All Games" games={nonFeaturedGames} />
    </div>
  )
}
