import { keyframes, style } from '@vanilla-extract/css'

export const modal = style({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'none',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
})

export const modalOpen = style({
  display: 'flex',
})

const fadeIn = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-20px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
})

export const modalBox = style({
  position: 'relative',
  backgroundColor: 'black',
  padding: '2rem',
  borderRadius: '0.5rem',
  width: '90%',
  maxWidth: '48rem',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  animation: `${fadeIn} 0.2s ease-out`,
})

export const closeButton = style({
  position: 'absolute',
  right: '0.5rem',
  top: '0.5rem',
  width: '2rem',
  height: '2rem',
  borderRadius: '50%',
  border: 'none',
  backgroundColor: '#222222',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  ':hover': {
    backgroundColor: '#e5e7eb',
  },
})

export const searchInput = style({
  width: '100%',
  padding: '0.75rem',
  border: '1px solid #e5e7eb',
  borderRadius: '0.375rem',
  fontSize: '1rem',
  backgroundColor: '#222222',
  color: 'white',
  ':focus': {
    outline: 'none',
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
})

export const resultsList = style({
  marginTop: '1rem',
  backgroundColor: '#222222',
  borderRadius: '0.5rem',
  overflow: 'hidden',
})

export const resultItem = style({
  padding: '0.75rem 1rem',
  cursor: 'pointer',
  color: 'white',
  ':hover': {
    backgroundColor: '#2d3748',
  },
  selectors: {
    '&.selected': {
      backgroundColor: '#2d3748',
      borderLeft: '4px solid #3b82f6',
    },
  },
})
