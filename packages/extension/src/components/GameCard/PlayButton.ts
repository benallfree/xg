import van from 'vanjs-core'

const { div } = van.tags

export const PlayButton = ({ faviconUrl }: { faviconUrl: string }) =>
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
