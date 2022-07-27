import { blackA, mauve } from '@radix-ui/colors'
import { DialogContent, DialogOverlay, DialogTitle } from '@radix-ui/react-dialog'
import { keyframes } from '@stitches/react'

import { styled } from './stitches.config'

const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
})

const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
})

export const Overlay = styled(DialogOverlay, {
  backgroundColor: '$overlayBackground',
  position: 'fixed',
  zIndex: 9,
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
})

export const Content = styled(DialogContent, {
  backgroundColor: '$sand5',
  borderRadius: 8,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 10,
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '2rem',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
})

export const Title = styled(DialogTitle, {
  margin: 0,
  marginBottom: '1rem',
  fontWeight: 500,
  color: '$highContrast',
  fontSize: 18,
})
