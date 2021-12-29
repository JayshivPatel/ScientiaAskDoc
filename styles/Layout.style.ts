import { styled } from './stitches.config'

export const Container = styled('div', {
  padding: '0 2rem',
})

export const Footer = styled('footer', {
  display: 'flex',
  flex: 1,
  padding: '2rem 0',
  borderTop: '1px solid #eaeaea',
  justifyContent: 'center',
  alignItems: 'center',
  '& a': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
})

export const Logo = styled('span', {
  height: '1em',
  marginLeft: '0.5rem',
})
