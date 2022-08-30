import { BoxArrowUpRight, Envelope, Trash3Fill } from 'react-bootstrap-icons'

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

export const ResourcesWrapper = styled('div', {
  display: 'grid',
  justifyItems: 'center',
  width: '100%',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '2rem',
  gridGap: '2rem',
  marginTop: '1rem',
})

export const LinkIcon = styled(BoxArrowUpRight, {
  marginRight: '0.5rem',
  fill: 'inherit',
  float: 'left',
  fontWeight: 500,
})

export const TitleWrapper = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

export const ExerciseTitle = styled('h3', {
  fontWeight: 400,
  fontSize: '2rem',
  width: 'fit-content',
})

export const EmailAddress = styled('address', {
  display: 'flex',
  alignItems: 'center',
})

export const Deadline = styled('p', {
  fontSize: '14px',
  color: '$highContrast',
})

export const SubmissionWrapper = styled('div', {
  marginTop: '1rem',
})

export const WorkloadSurveyWrapper = styled('div', {
  margin: '2rem',
  display: 'flex',
  fontSize: '0.9rem',
  marginTop: '1rem',
})

export const WorkloadSelect = styled('select', {
  display: 'inline',
  marginLeft: '0.5rem',
})

export const PlagiarismDisclaimer = styled('p', {
  fontSize: '0.9rem',
  marginTop: '1rem',
  textAlign: 'center',
})
