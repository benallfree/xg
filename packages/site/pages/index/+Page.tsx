import { faDownload, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { GameRecord } from '../../server/types'

export default function Page() {
  const [games, setGames] = useState<GameRecord[]>([])

  useEffect(() => {
    fetch('/api/games')
      .then((res) => res.json())
      .then((data) => setGames(data as GameRecord[]))
  }, [])

  return (
    <div className="min-h-screen bg-base-200">
      <div className="hero min-h-[50vh]">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-8">Play Games on X</h1>
            <p className="text-xl mb-8">X Games is a browser extension that allows you to play games on X.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/benallfree/xg/releases"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-lg"
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" /> Install Now
              </a>
              <a href="/add" className="btn btn-secondary btn-lg" aria-label="Add Your Game">
                <FontAwesomeIcon icon={faPlus} className="mr-2" /> Add Your Game
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Available Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => (
            <div key={game.site || game.player} className="card bg-base-100 shadow-xl">
              {game.image && (
                <figure>
                  <img src={game.image} alt={game.title || 'Game thumbnail'} className="w-full h-48 object-cover" />
                </figure>
              )}
              <div className="card-body">
                <h3 className="card-title">{game.title || 'Untitled Game'}</h3>
                <p className="text-sm text-base-content/70">{game.description || 'No description available'}</p>
                <div className="card-actions justify-end mt-4">
                  <a href={game.player} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    Play Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
