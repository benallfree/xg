import { ApprovalStatus, type XGame, type XGamePreferences } from '../types'

const STORAGE_PREFIX = 'xgame:'

function getStorageKey(playerUrl: string): string {
  // Replace special characters and make URL safe for storage key
  return STORAGE_PREFIX + encodeURIComponent(playerUrl)
}

function isGameKey(key: string): boolean {
  return key.startsWith(STORAGE_PREFIX)
}

function getPlayerUrl(key: string): string {
  return decodeURIComponent(key.slice(STORAGE_PREFIX.length))
}

export async function getXGames(): Promise<Record<string, XGame>> {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (result) => {
      const games: Record<string, XGame> = {}
      for (const [key, value] of Object.entries(result)) {
        console.log('key', key, 'value', value)
        if (isGameKey(key)) {
          const playerUrl = getPlayerUrl(key)
          games[playerUrl] = value as XGame
        }
      }
      resolve(games)
    })
  })
}

export async function saveGameMeta(playerUrl: string, meta: XGame['meta']): Promise<void> {
  const key = getStorageKey(playerUrl)
  const existing = await getGame(playerUrl)

  const xgame: XGame = {
    meta,
    preferences: existing.preferences,
  }

  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: xgame }, resolve)
  })
}

export async function updateGamePreferences(playerUrl: string, preferences: Partial<XGamePreferences>): Promise<void> {
  const key = getStorageKey(playerUrl)
  const existing = await new Promise<XGame | undefined>((resolve) => {
    chrome.storage.local.get([key], (result) => resolve(result[key] as XGame | undefined))
  })

  if (existing) {
    return new Promise((resolve) => {
      chrome.storage.local.set(
        {
          [key]: { ...existing, preferences: { ...existing.preferences, ...preferences } },
        },
        resolve
      )
    })
  }
}

export const getGame = async (playerUrl: string): Promise<XGame> => {
  const key = getStorageKey(playerUrl)
  const existing = await new Promise<Partial<XGame> | undefined>((resolve) => {
    chrome.storage.local.get([key], (result) => resolve(result[key] as Partial<XGame> | undefined))
  })
  if (!existing) return { meta: {}, preferences: { approvalStatus: ApprovalStatus.Ask } }
  const final: XGame = {
    ...existing,
    meta: existing.meta || {},
    preferences: { approvalStatus: ApprovalStatus.Ask, ...existing.preferences },
  }
  console.log('Game loaded', final)
  return final
}

export function addStorageListener(callback: (games: Record<string, XGame>) => void): void {
  chrome.storage.onChanged.addListener((changes) => {
    const gameChanges: Record<string, XGame> = {}
    let hasChanges = false

    for (const [key, change] of Object.entries(changes)) {
      if (isGameKey(key)) {
        hasChanges = true
        const playerUrl = getPlayerUrl(key)
        if (change.newValue) {
          gameChanges[playerUrl] = change.newValue as XGame
        }
      }
    }

    if (hasChanges) {
      callback(gameChanges)
    }
  })
}
