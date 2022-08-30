import { BoxArrowUpRight, Envelope, Trash3Fill } from 'react-bootstrap-icons'

import { Button } from './_app.style'
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
  fontSize: '16px',
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

export const EmailButton = styled(Envelope, {
  cursor: 'pointer',
  fontSize: '1rem',
  '&:hover': {
    fill: '$lowContrast',
  },
})

export const TrashButton = styled(Trash3Fill, {
  cursor: 'pointer',
  fontSize: '1rem',
})

export const OpenLinkButton = styled(BoxArrowUpRight, {
  marginRight: '1rem',
  fontSize: '1rem',
  '&:hover': {
    fill: '$lowContrast',
  },
})

export const GroupInstructionText = styled('p', {
  marginTop: '1rem',
  color: '$highContrast',
})

export const InviteModeButton = styled(Button, {
  width: 'auto',
  padding: '0.5rem',
  marginLeft: '0.5rem',
})

export const InviteButtonsWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'end',
})

export const GroupWrapper = styled('div', {
  all: 'unset',
  display: 'block',
  width: 'auto',
  marginTop: '0.75rem',
  marginBottom: '1rem',
  padding: '0.75rem',
  borderRadius: '12px',
  color: '$highContrast',
  backgroundColor: '$sand1',
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.06)) drop-shadow(0 1px 3px rgba(0,0,0,.1))',
  '&:hover': {
    backgroundColor: '$sand2',
  },
})

export const StudentList = styled('ul', {
  listStyleType: 'none',
})

export const GroupHeader = styled('h6', {
  marginLeft: '1rem',
})

export const UploadWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
})

/* TODO: Implement user specified overrides */
export const UploadButton = styled('label', {
  all: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  marginTop: '1rem',
  padding: '1rem',
  borderRadius: '12px',
  color: '$highContrast',
  backgroundColor: '$sand1',
  cursor: 'pointer',
  filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.06)) drop-shadow(0 1px 3px rgba(0,0,0,.1))',
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
