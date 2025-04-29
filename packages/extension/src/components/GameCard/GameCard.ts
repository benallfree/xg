import van from 'vanjs-core'
import type { XGame } from '../../types'
import { getImageBlobUrl } from '../../utils/image'
import { getFaviconUrl } from '../../utils/imageLoader'
import { GameImage } from './GameImage'
import { GameInfo } from './GameInfo'
import { PlayButton } from './PlayButton'

const { div } = van.tags

export const GameCard = ({ xgame, onPlay }: { xgame: XGame; onPlay: () => void }) => {
  const imageBlobUrl = van.state('')
  const faviconUrl = getFaviconUrl()

  if (xgame.meta.image) {
    getImageBlobUrl(xgame.meta.image).then((url) => (imageBlobUrl.val = url))
  }

  console.log(`GameCard rendered ${xgame.meta.game}`)
  const card = div(
    {
      style: `
        display: flex;
        gap: 16px;
        align-items: stretch;
        min-height: 160px;
        position: relative;
        border-radius: 8px;
      `,
      onclick: (e) => {
        e.preventDefault()
        onPlay()
      },
    },
    // Left side - Game image with play button overlay
    div(
      {
        style: `
          position: relative;
          flex: 0 0 160px;
          border-radius: 8px;
          overflow: hidden;
          cursor: pointer;
          background: #2a2b36;
          border-radius: 11px;
        `,
      },
      GameImage({ imageBlobUrl }),
      PlayButton({ faviconUrl })
    ),
    // Right side - Game info
    GameInfo(xgame)
  )
  return card
}
