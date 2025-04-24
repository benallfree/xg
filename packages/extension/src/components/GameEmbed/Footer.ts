import van from 'vanjs-core'
import { XGame } from '../../types'
import { ReportButton } from './ReportButton'
import { Sponsor } from './Sponsor'

const { div } = van.tags

export const Footer = ({ xgame }: { xgame: XGame }) =>
  div(
    {
      style: `
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 5px;
        color: #666; 
        font-size: 0.9em;
      `,
    },
    Sponsor(),
    ReportButton({ xgame })
  )
