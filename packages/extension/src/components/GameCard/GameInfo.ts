import van from 'vanjs-core'
import type { XGame } from '../../types'
import { ByLine } from './ByLine'
import { MiniSponsor } from './MiniSponsor'

const { div } = van.tags

export const GameInfo = (xgame: XGame) =>
  div(
    {
      style: `
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin: 10px;
    `,
    },
    div(
      {
        style: `
        font-size: 18px;
        font-weight: 600;
        color: #e5e7eb;
      `,
      },
      xgame.meta.title || 'Unknown Game'
    ),
    div(
      {
        style: `
        font-size: 14px;
        color: #9ca3af;
        flex: 1;
      `,
      },
      xgame.meta.description || ''
    ),
    div(
      {
        style: `
        display: flex;
        justify-content: space-between;
        `,
      },
      ByLine({ xgame }),
      MiniSponsor({ xgame })
    )
  )
