import van, { State } from 'vanjs-core'

const { div } = van.tags

export const GameImage = ({ imageBlobUrl }: { imageBlobUrl: State<string> }) =>
  div(
    // Blurred background layer
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
        filter: blur(10px) brightness(0.8);
        transform: scale(1.1);
        ${!imageBlobUrl.val ? 'display: none;' : ''}
        border-radius: 8px;
      `,
    }),
    // Main image layer
    div({
      style: () => `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        height: 100%;
        background-image: url('${imageBlobUrl.val}');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        ${!imageBlobUrl.val ? 'display: none;' : ''}
        border-radius: 8px;
      `,
    })
  )
