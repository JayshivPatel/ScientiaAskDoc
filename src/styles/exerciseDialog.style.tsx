import { styled } from './stitches.config'

export const UploadWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

/* TODO: Implement user specified overrides */
export const UploadButton = styled('label', {
  all: 'unset',
  padding: '0.75rem',
  color: '$highContrast',
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'space-between',
  '&:hover': {
    background: '$elementHover',
  },
})
