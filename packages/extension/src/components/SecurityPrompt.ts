import van from 'vanjs-core'
import { ApprovalStatus, type XGame } from '../types'
import { updateGamePreferences } from '../utils/storage'

const { div, button } = van.tags

export const SecurityPrompt = ({
  xgame,
  onPlay,
  onAlwaysPlay,
  onCancel,
}: {
  xgame: XGame
  onPlay: () => void
  onAlwaysPlay: () => void
  onCancel: () => void
}) =>
  div(
    {
      style: `
      padding: 16px;
      border-radius: 8px;
      background: rgba(0, 0, 0, 1);
      border: 1px solid #374151;
      margin: 5px;
      position: absolute;
      inset: 5px;
      z-index: 1000;
    `,
    },
    div(
      { style: 'margin-bottom: 12px; color: #9ca3af;' },
      '🎮 Would you like to play this game? X Games does not maintain or verify third-party games. Be cautious of potential scams.'
    ),
    div(
      { style: 'display: flex; gap: 8px;' },
      button(
        {
          onclick: (e: Event) => {
            e.stopPropagation()
            onPlay()
            updateGamePreferences(xgame.meta.game || '', { approvalStatus: ApprovalStatus.Ask })
          },
          style: `
          padding: 8px 16px;
          border-radius: 6px;
          background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
          color: white;
          border: none;
          font-weight: 500;
          cursor: pointer;
        `,
        },
        '🎯 Play Once'
      ),
      button(
        {
          onclick: (e: Event) => {
            e.stopPropagation()
            onAlwaysPlay()
            updateGamePreferences(xgame.meta.game || '', { approvalStatus: ApprovalStatus.Always })
          },
          style: `
          padding: 8px 16px;
          border-radius: 6px;
          background: linear-gradient(180deg, #4f46e5 0%, #4338ca 100%);
          color: white;
          border: none;
          font-weight: 500;
          cursor: pointer;
        `,
        },
        '🚀 Always Play'
      ),
      button(
        {
          onclick: (e: Event) => {
            e.stopPropagation()
            onCancel()
          },
          style: `
          padding: 8px 16px;
          border-radius: 6px;
          background: linear-gradient(180deg, #991b1b 0%, #7f1d1d 100%);
          color: white;
          border: none;
          font-weight: 500;
          cursor: pointer;
        `,
        },
        '❌ Cancel'
      )
    )
  )
