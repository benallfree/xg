import { faGithub, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { XGame } from '../../extension/src/types'

export function GameCard({ game }: { game: XGame }) {
  return (
    <div className="border border-[#e1e8ed] rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 flex flex-col h-full min-w-[300px] max-w-[300px]">
      <img src={game.meta.image} alt={game.meta.title} className="w-full h-[200px] object-cover rounded-lg mb-4" />
      <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2 leading-tight">{game.meta.title}</h3>
      <p className="text-[0.95rem] text-[#4a5568] leading-normal mb-auto line-clamp-2">{game.meta.description}</p>
      <div className="flex justify-between items-center mt-3 text-sm pt-3 border-t border-[#f0f0f0] gap-2">
        <a
          href={`https://x.com/i/communities/${game.meta.site}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1da1f2] px-3 py-1.5 rounded-full bg-[#f8fafc] hover:bg-[#e8f5fe] hover:text-[#0c7abf] transition-all flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faXTwitter} />
        </a>
        {game.meta.player && (
          <a
            href={game.meta.player}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1da1f2] px-3 py-1.5 rounded-full bg-[#f8fafc] hover:bg-[#e8f5fe] hover:text-[#0c7abf] transition-all flex items-center gap-1"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="sr-only">GitHub Repository</span>
          </a>
        )}
        <a
          href={game.meta.player || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#1da1f2] px-3 py-1.5 rounded-full bg-[#f8fafc] hover:bg-[#e8f5fe] hover:text-[#0c7abf] transition-all flex items-center gap-1"
        >
          <FontAwesomeIcon icon={faHouse} /> <span className="sr-only">Visit Website</span>
        </a>
      </div>
    </div>
  )
}
