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
