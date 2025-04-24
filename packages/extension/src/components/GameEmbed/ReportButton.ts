import van from 'vanjs-core'
import { XGame } from '../../types'

const { a } = van.tags

export const ReportButton = ({ xgame }: { xgame: XGame }) => {
  const reportButton = a(
    {
      href: `https://github.com/benallfree/xg/discussions/new?category=q-a&title=Incident report: ${xgame.meta.title}&body=${xgame.meta.player}`,
      target: '_blank',
      style: 'color: #666; text-decoration: underline;',
    },
    'Report an issue'
  )

  return reportButton
}
