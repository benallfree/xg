import van, { State } from 'vanjs-core'

const { div } = van.tags

export const GameImage = ({ imageBlobUrl }: { imageBlobUrl: State<string> }) =>
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
  })
