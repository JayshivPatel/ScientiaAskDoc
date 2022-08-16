import { Trash3Fill } from 'react-bootstrap-icons'

import { styled } from './stitches.config'

// TODO: refactor this css
export const SpecLink = styled('a', {
  // width: 'auto',
  width: 'fit-content',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  border: '2px solid $sand8',
  color: '$sand12',
  fill: '$sand12',
  fontWeight: 500,
  fontSize: '18px',
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-flex',
  cursor: 'pointer',
  userSelect: 'none',
  // marginTop: '24px',
  transition: 'all .1s ease-in',
  '&:hover': {
    background: '$blue9',
    border: '2px solid $blue10',
    color: 'white',
    fill: 'white',
  },
})

export const ResourceLink = styled('a', {
  textDecoration: 'underline !important',
  textUnderlineOffset: '4px',
  textDecorationColor: '$sand8 !important',
  color: '$blue10',
  '&:visited': {
    color: '#793aaf', // $purple11
  },
  '&:hover, &:visited:hover': {
    color: '$blue11',
    textDecorationColor: '$sand10 !important',
  },
})

export const TrashButton = styled(Trash3Fill, {
  fontSize: '1rem',
  '&:hover': {
    fill: 'red',
  },
})

export const UploadWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

/* TODO: Implement user specified overrides */
export const UploadButton = styled('label', {
  all: 'unset',
  padding: '1rem',
  borderRadius: '12px',
  color: '$highContrast',
  display: 'flex',
  cursor: 'pointer',
  justifyContent: 'space-between',
  '&:hover': {
    backgroundColor: '$sand2',
  },
})

export const ModulePill = styled('p', {
  background: '$blue5',
  fontSize: '14px',
  borderRadius: '16px',
  padding: '8px 12px',
  display: 'inline-flex',

  alignItems: 'center',
  width: 'fit-content',
  height: 'fit-content',
  margin: 0,
  textAlign: 'center',
})
