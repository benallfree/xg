/// <reference types="chrome"/>
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Game } from '../../site/components/GameCard'

// Define approval status types
const ApprovalStatus = {
  ASK: 'ask',
  ALWAYS: 'always',
  NEVER: 'never',
} as const

type ApprovalStatusType = (typeof ApprovalStatus)[keyof typeof ApprovalStatus]

interface CommunityPreference {
  approvalStatus: ApprovalStatusType
}

interface StorageData {
  preferences: Record<string, CommunityPreference>
}

const GameItem: React.FC<{
  game: Game
  preference?: CommunityPreference
  onStatusChange: (communityId: string, status: ApprovalStatusType) => void
}> = ({ game, preference, onStatusChange }) => (
  <div className="card bg-base-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group">
    <a
      href={`https://x.com/i/communities/${game.xCommunityId}`}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 z-10"
      aria-label={`Visit ${game.title} community`}
    />
    <figure className="h-24 overflow-hidden">
      <img
        src={`https://xg.benallfree.com/${game.imagePath}`}
        alt={game.title}
        className="w-full h-full object-cover"
      />
    </figure>
    <div className="card-body p-3">
      <h3 className="card-title text-sm mb-1">{game.title}</h3>
      <select
        value={preference?.approvalStatus || ApprovalStatus.ASK}
        onChange={(e) => onStatusChange(game.slug, e.target.value as ApprovalStatusType)}
        className="select select-bordered select-xs w-full relative z-20"
      >
        <option value={ApprovalStatus.ASK}>Ask to Run</option>
        <option value={ApprovalStatus.ALWAYS}>Always Allow</option>
        <option value={ApprovalStatus.NEVER}>Never Run</option>
      </select>
    </div>
  </div>
)

const ErrorState: React.FC<{ error: string; onRetry: () => void; isLoading: boolean }> = ({
  error,
  onRetry,
  isLoading,
}) => (
  <div className="card bg-base-200 border border-error/30 shadow-lg p-5 text-center animate-pulse">
    <div className="text-error mb-4 text-lg">{error}</div>
    <button
      className="btn btn-outline btn-error btn-sm uppercase tracking-wider"
      onClick={onRetry}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : '↻ Refresh'}
    </button>
  </div>
)

const App: React.FC = () => {
  const [games, setGames] = useState<Game[]>([])
  const [preferences, setPreferences] = useState<Record<string, CommunityPreference>>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCommunities = async () => {
    setError(null)
    setIsLoading(true)

    try {
      const response = await fetch('https://xg.benallfree.com/whitelist.json')
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`)
      }
      const data = await response.json()
      const games = data.games as Game[]
      console.log(`***games`, games)
      setGames(games)
      setIsLoading(false)
    } catch (err) {
      setError('Failed to load communities. Please check your connection.')
      setIsLoading(false)
      console.error('Failed to fetch communities:', err)
    }
  }

  const loadPreferences = () => {
    chrome.storage.sync.get(['preferences'], (result: { preferences?: StorageData['preferences'] }) => {
      setPreferences(result.preferences || {})
    })
  }

  const updateStatus = (communityId: string, newStatus: ApprovalStatusType) => {
    const newPreferences = {
      ...preferences,
      [communityId]: { approvalStatus: newStatus },
    }

    // Only store in chrome.storage when user explicitly sets a preference
    chrome.storage.sync.set({ preferences: newPreferences })
    setPreferences(newPreferences)
  }

  useEffect(() => {
    fetchCommunities()
    loadPreferences()
  }, [])

  console.log(`***games`, games)
  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold text-primary">X Games v{chrome.runtime.getManifest().version}</h1>
        <div className="flex gap-2 justify-center">
          <a
            href="https://x.com/i/communities/1914065447114396075"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Community
          </a>
          <a
            href="https://github.com/benallfree/xg/blob/main/add.md"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Add Your Game
          </a>
          <a
            href="https://buy.polar.sh/polar_cl_kHsG7kp6B7PElpJbEO4xbzwzRMKKxIcgbN03C2zibvl"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-sm"
          >
            Advertise
          </a>
        </div>
        <div className="text-xs space-x-2 opacity-70">
          <a
            href="https://xg.benallfree.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Privacy Policy
          </a>
          <span>·</span>
          <a
            href="https://xg.benallfree.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="link link-hover"
          >
            Terms of Service
          </a>
        </div>
      </div>
      {error ? (
        <ErrorState error={error} onRetry={fetchCommunities} isLoading={isLoading} />
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {games.map((game) => (
            <GameItem key={game.slug} game={game} preference={preferences[game.slug]} onStatusChange={updateStatus} />
          ))}
        </div>
      )}
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
