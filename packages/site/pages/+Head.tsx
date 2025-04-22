// https://vike.dev/Head

import { ReactElement } from 'react'

export default function Head(): ReactElement {
  return (
    <>
      <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
      <link rel="manifest" href="/icons/site.webmanifest" />
      <link rel="shortcut icon" href="/icons/favicon.ico" />
    </>
  )
}
