/// <reference types="chrome"/>
import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ApprovalStatus, type XGame } from './types'
import { getFaviconUrl } from './utils/imageLoader'
import { addStorageListener, getXGames, updateGamePreferences } from './utils/storage'

const GameItem: React.FC<{
  xgame: XGame
  onStatusChange: (gameUrl: string, status: ApprovalStatus) => void
}> = ({ xgame, onStatusChange }) => (
  <div className="card bg-base-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 relative group">
    <figure className="h-24 overflow-hidden">
      <img src={xgame.meta.image || ''} alt={xgame.meta.title || 'Game'} className="w-full h-full object-cover" />
    </figure>
    <div className="card-body p-3">
      <h3 className="card-title text-sm mb-1">{xgame.meta.title || 'Unknown Game'}</h3>
      <select
        value={xgame.preferences.approvalStatus}
        onChange={(e) => onStatusChange(xgame.meta.game!, e.target.value as ApprovalStatus)}
        className="select select-bordered select-xs w-full relative z-20"
      >
        <option value={ApprovalStatus.Ask}>Ask to Run</option>
        <option value={ApprovalStatus.Always}>Always Allow</option>
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
  const [discoveredGames, setDiscoveredGames] = useState<Record<string, XGame>>({})
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const loadDiscoveredGames = async () => {
    setIsLoading(true)
    try {
      const games = await getXGames()
      setDiscoveredGames(games)
    } catch (err) {
      setError('Failed to load games')
      console.error('Failed to load games:', err)
    }
    setIsLoading(false)
  }

  const updateStatus = async (gameUrl: string, newStatus: ApprovalStatus) => {
    try {
      await updateGamePreferences(gameUrl, { approvalStatus: newStatus })
      const games = await getXGames()
      setDiscoveredGames(games)
    } catch (err) {
      console.error('Failed to update game status:', err)
    }
  }

  useEffect(() => {
    loadDiscoveredGames()
    addStorageListener(setDiscoveredGames)
  }, [])

  const faviconUrl = getFaviconUrl()

  return (
    <div className="p-4 max-w-2xl mx-auto space-y-4">
      <div className="text-center space-y-2">
        <h1 className="text-xl font-semibold text-primary">
          <img src={faviconUrl} alt="X Games" className="w-6 h-6 inline-block mr-2" />X Games v
          {chrome.runtime.getManifest().version}
        </h1>
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
            href="https://xg.benallfree.com/add"
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
        <ErrorState error={error} onRetry={loadDiscoveredGames} isLoading={isLoading} />
      ) : (
        <div className="space-y-4">
          {Object.keys(discoveredGames).length > 0 ? (
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(discoveredGames).map(([url, xgame]) => (
                <GameItem key={url} xgame={xgame} onStatusChange={updateStatus} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">No games found yet. Browse X to discover games!</div>
          )}
        </div>
      )}
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)
root.render(<App />)
