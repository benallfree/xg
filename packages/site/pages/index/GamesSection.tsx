import { GameRecord } from '../../server/types'

interface GamesSectionProps {
  title: string
  games: GameRecord[]
}

export function GamesSection({ title, games }: GamesSectionProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.site || game.player} className="card bg-base-100 shadow-xl">
            {game.image && (
              <figure>
                <img src={game.image} alt={game.title || 'Game thumbnail'} className="w-full h-auto object-contain" />
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
  )
}
