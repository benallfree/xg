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
  player?: string
  playerWidth?: string
  playerHeight?: string
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
    player: FieldValidation
  }
}

export type GameRecord = {
  card: string
  site: string
  title: string
  description: string
  image: string
  player: string
}
