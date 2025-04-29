import van from 'vanjs-core'
import type { XGame } from '../../types'
import { Footer } from './Footer'

const { div, a, iframe } = van.tags

export const GameEmbed = ({ xgame }: { xgame: XGame }) => {
  if (!xgame.meta.game) return

  return div(
    iframe({
      src: xgame.meta.game,
      allow: 'clipboard-write',
      style: `
      width: 100%;
      height: 400px;
      border: none;
      border-top-left-radius: 11px;
      border-top-right-radius: 11px;
    `,
    }),
    Footer({ xgame })
  )
}
