import { globalStyle, style } from '@vanilla-extract/css'

export const gameCard = style({
  border: '1px solid #e1e8ed',
  borderRadius: '12px',
  padding: '20px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  transition: 'all 0.2s ease',
  ':hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
})

export const gameThumbnail = style({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '16px',
})

export const gameTitle = style({
  fontSize: '1.25rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '8px',
  lineHeight: '1.4',
})

export const gameDescription = style({
  fontSize: '0.95rem',
  color: '#4a5568',
  lineHeight: '1.5',
  marginBottom: '16px',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
})

export const gameMeta = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '12px',
  fontSize: '0.9rem',
  padding: '12px 0 0',
  borderTop: '1px solid #f0f0f0',
})

globalStyle(`${gameMeta} a`, {
  color: '#1da1f2',
  textDecoration: 'none',
  padding: '6px 12px',
  borderRadius: '16px',
  backgroundColor: '#f8fafc',
  transition: 'all 0.2s ease',
})

globalStyle(`${gameMeta} a:hover`, {
  backgroundColor: '#e8f5fe',
  color: '#0c7abf',
})
