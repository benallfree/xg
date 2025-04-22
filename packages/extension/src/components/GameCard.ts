import van from 'vanjs-core'
import type { XGame } from '../types'
import { getImageBlobUrl } from '../utils/image'
import { getFaviconUrl } from '../utils/imageLoader'
import { GameInfo } from './GameInfo'

const { div, button, a } = van.tags

export const GameCard = ({ xgame, onPlay }: { xgame: XGame; onPlay: () => void }) => {
  const imageBlobUrl = van.state('')
  const faviconUrl = getFaviconUrl()

  if (xgame.meta.image) {
    getImageBlobUrl(xgame.meta.image).then((url) => (imageBlobUrl.val = url))
  }

  console.log(`GameCard rendered ${xgame.meta.player}`)
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
      // Game image
      div({
        style: () => `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url('${imageBlobUrl.val}');
          background-size: cover;
          background-position: center;
          ${!imageBlobUrl.val ? 'display: none;' : ''}
          border-radius: 8px;
        `,
      }),
      // Play button overlay
      div(
        {
          style: `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.4);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.2s;
            &:hover {
              background: rgba(0, 0, 0, 0.6);
            }
          `,
        },
        div(
          {
            style: `
              width: 48px;
              height: 48px;
              border-radius: 24px;
              background: rgb(14 14 19 / 90%);
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
            `,
          },
          div({
            style: `
              width: 32px;
              height: 32px;
              background-image: url('${faviconUrl}');
              background-size: contain;
              background-position: center;
              background-repeat: no-repeat;
            `,
          })
        )
      )
    ),
    // Right side - Game info
    GameInfo(xgame)
  )
  return card
}
