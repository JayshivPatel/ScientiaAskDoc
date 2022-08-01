import { styled } from './stitches.config'

export const UploadWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

/* TODO: Implement user specified overrides */
export const UploadButton = styled('label', {
  all: 'unset',
  padding: '1rem',
  borderRadius: '8px',
  color: '$highContrast',
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'space-between',
  '&:hover': {
    background: '$elementHover',
  },
})

export const ModulePill = styled('p', {
  background: '$blue5',
  fontSize: '14px',
  borderRadius: '16px',
  padding: '4px 12px',
  display: 'inline-block',
  width: 'fit-content',
  margin: 0,
  textAlign: 'center',
})
