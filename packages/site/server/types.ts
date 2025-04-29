export enum ApprovalStatus {
  Ask = 'ask',
  Always = 'always',
}

export interface XGamePreferences {
  approvalStatus: ApprovalStatus
}

export interface TwitterMeta {
  card?: string
  site?: string
  title?: string
  description?: string
  image?: string
  game?: string
  gameWidth?: string
  gameHeight?: string
  gameType?: 'touch' | 'mousekeyboard' | 'multi'
}

export type XGame = {
  meta: TwitterMeta
  preferences: XGamePreferences
}

export type XGamesResolved = {
  meta: TwitterMeta
  isGame: boolean
}

export interface VerifyRequest {
  url: string
}

export interface FieldValidation {
  value: string | undefined
  status: 'ok' | 'error'
  message?: string
}

export interface VerifyResponse {
  verified: boolean
  lastChecked?: number
  error?: string
  fields?: {
    card: FieldValidation
    site: FieldValidation
    title: FieldValidation
    description: FieldValidation
    image: FieldValidation
    game: FieldValidation
  }
}

export type GameRecord_V1 = {
  card: string
  site: string
  title: string
  description: string
  image: string
  player: string
  featuredAt: number
}

export type GameRecord = {
  card: string
  site: string
  title: string
  description: string
  image: string
  game: string
  gameType: 'touch' | 'mousekeyboard' | 'multi'
  gameWidth: string
  gameHeight: string
  featuredAt: number
}
