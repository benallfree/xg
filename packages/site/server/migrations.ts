import { GameRecord, GameRecord_V1 } from './types'

export function migrateGameRecordV1(record: GameRecord_V1): GameRecord {
  return {
    ...record,
    game: record.player,
    gameType: 'mousekeyboard', // Default to mousekeyboard for legacy games
    gameWidth: '1024', // Default width
    gameHeight: '576', // Default height
  }
}

export async function runMigrations(storage: DurableObjectStorage) {
  const result = await storage.list<GameRecord_V1>({ prefix: 'verify:' })
  let migratedCount = 0

  for (const [key, record] of result) {
    // Check if it's a V1 record by looking for player property and missing game property
    if ('player' in record && !('game' in record)) {
      const updatedRecord = migrateGameRecordV1(record)
      await storage.put(key, updatedRecord)
      migratedCount++
      console.log(`Migrated ${key} from GameRecord_V1 to GameRecord`)
    }
  }

  if (migratedCount > 0) {
    console.log(`Migration complete: migrated ${migratedCount} records`)
  }

  return migratedCount
}
