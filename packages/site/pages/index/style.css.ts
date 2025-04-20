import { style } from '@vanilla-extract/css'

export const container = style({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '24px',
})

export const headerSection = style({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
})

export const gamesGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '24px',
  marginTop: '24px',
})
