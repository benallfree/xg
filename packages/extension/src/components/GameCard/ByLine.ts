import van from 'vanjs-core'
import type { XGame } from '../../types'

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
