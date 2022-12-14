import { styled } from './stitches.config'

export const TabsWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
})

/* TODO: Implement user specified overrides */
export const Tab = styled('button', {
  all: 'unset',
  padding: '0.75rem',
  color: '$highContrast',
  display: 'flex',
  position: 'relative',
  cursor: 'pointer',
  transition: 'color 250ms',
  justifyContent: 'space-between',
})

export const TabsHighlight = styled('div', {
  background: '$elementHover',
  position: 'absolute',
  borderRadius: '0.5rem',
  height: '2.75rem',
  transition: '0.15s ease',
  transitionProperty: 'width, transform, opacity',
})
