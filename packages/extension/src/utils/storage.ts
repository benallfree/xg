import { ApprovalStatus, type XGame, type XGamePreferences } from '../types'

const STORAGE_PREFIX = 'xgame:'

function getStorageKey(gameUrl: string): string {
  // Prefix to avoid collisions with other extensions
  return STORAGE_PREFIX + encodeURIComponent(gameUrl)
}

function isGameKey(key: string): boolean {
  return key.startsWith(STORAGE_PREFIX)
}

function getPlayerUrl(key: string): string {
  return decodeURIComponent(key.replace(STORAGE_PREFIX, ''))
}

export async function getXGames(): Promise<Record<string, XGame>> {
  const games: Record<string, XGame> = {}
  const items = await chrome.storage.local.get(null)
  Object.entries(items).forEach(([key, value]) => {
    if (!key.startsWith(STORAGE_PREFIX)) return
    const gameUrl = getPlayerUrl(key)
    games[gameUrl] = value as XGame
  })
  return games
}

export async function saveGameMeta(gameUrl: string, meta: XGame['meta']): Promise<void> {
  const key = getStorageKey(gameUrl)
  const existing = await getGame(gameUrl)
  const xgame: XGame = {
    meta,
    preferences: existing?.preferences || {
      approvalStatus: ApprovalStatus.Ask,
    },
  }
  await chrome.storage.local.set({ [key]: xgame })
}

export async function updateGamePreferences(gameUrl: string, preferences: Partial<XGamePreferences>): Promise<void> {
  const key = getStorageKey(gameUrl)
  const existing = await chrome.storage.local.get(key)
  const xgame = existing[key] as XGame | undefined
  if (!xgame) return

  const updatedXGame: XGame = {
    ...xgame,
    preferences: {
      ...xgame.preferences,
      ...preferences,
    },
  }
  await chrome.storage.local.set({ [key]: updatedXGame })
}

export const getGame = async (gameUrl: string): Promise<XGame> => {
  const key = getStorageKey(gameUrl)
  const result = await chrome.storage.local.get(key)
  const xgame = result[key] as XGame | undefined
  if (!xgame) {
    return {
      meta: {},
      preferences: {
        approvalStatus: ApprovalStatus.Ask,
      },
    }
  }
  return xgame
}

export const addStorageListener = (onChange: (games: Record<string, XGame>) => void) => {
  chrome.storage.onChanged.addListener(async (changes) => {
    const gameChanges: Record<string, XGame> = {}
    Object.entries(changes).forEach(([key, change]) => {
      if (!key.startsWith(STORAGE_PREFIX)) return
      const gameUrl = getPlayerUrl(key)
      if (change.newValue) gameChanges[gameUrl] = change.newValue as XGame
    })
    if (Object.keys(gameChanges).length > 0) {
      onChange(await getXGames())
    }
  })
}
