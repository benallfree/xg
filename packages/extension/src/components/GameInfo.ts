import van from 'vanjs-core'
import type { Sponsor } from '../../../site/server/sponsors'
import { getSponsor } from '../api'
import type { XGame } from '../types'

const { div, a } = van.tags

export const ByLine = ({ xgame }: { xgame: XGame }) =>
  div(
    {
      style: `
      font-size: 14px;
      color: #6b7280;
    `,
    },
    `by `,
    () => {
      const username = xgame.meta.site?.slice(1)
      if (!username) return div()
      return a(
        {
          href: `#`,
          target: '_blank',
          style: 'color: #60a5fa; text-decoration: none; &:hover { text-decoration: underline; }',
          onclick: (e) => {
            e.preventDefault()
            alert('clicked')
          },
        },
        `@${username}`
      )
    }
  )

export const MiniSponsor = ({ xgame }: { xgame: XGame }) => {
  const sponsor = van.state<Sponsor | null>(null)
  getSponsor().then((sp) => (sponsor.val = sp))

  return div(
    {
      style: `
      font-size: 14px;
      color: #6b7280;
    `,
    },
    `❤️ `,
    () => {
      if (!sponsor.val) return div()
      return a(
        {
          href: `https://x.com/${sponsor.val.name}`,
          target: '_blank',
          style: 'color: #60a5fa; text-decoration: none; &:hover { text-decoration: underline; }',
        },
        `@${sponsor.val.name}`
      )
    }
  )
}

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
