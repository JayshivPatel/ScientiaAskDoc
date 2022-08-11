import { blackA, mauve, violet } from '@radix-ui/colors'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown, ChevronUp, Trash3Fill } from 'react-bootstrap-icons'

import { styled } from './stitches.config'

// TODO: refactor this css
export const SpecLink = styled('a', {
  width: 'auto',
  alignItems: 'center',
  padding: '0.5rem 1rem',
  border: '2px solid $sand8',
  color: '$sand8',
  fontWeight: 600,
  borderRadius: '8px',
  textDecoration: 'none',
  display: 'inline-flex',
  cursor: 'pointer',
  userSelect: 'none',
  marginTop: '24px',
  transition: 'all .1s ease-in',
  '&:hover': {
    background: '$blue9',
    border: '2px solid $blue9',
    color: 'white',
    fill: 'white',
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
    opacity: '80%',
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

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: 'unset',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 15px',
  fontSize: 13,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: 'white',
  color: violet.violet11,
  boxShadow: `0 2px 10px ${blackA.blackA7}`,
  '&:hover': { backgroundColor: mauve.mauve3 },
  '&:focus': { boxShadow: `0 0 0 2px black` },
  '&[data-placeholder]': { color: violet.violet9 },
})

const StyledIcon = styled(SelectPrimitive.SelectIcon, {
  color: violet.violet11,
})

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
})

const StyledItem = styled(SelectPrimitive.Item, {
  all: 'unset',
  fontSize: 13,
  lineHeight: 1,
  color: violet.violet11,
  borderRadius: 3,
  display: 'flex',
  alignItems: 'center',
  height: 25,
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-disabled]': {
    color: mauve.mauve8,
    pointerEvents: 'none',
  },

  '&[data-highlighted]': {
    backgroundColor: violet.violet9,
    color: violet.violet1,
  },
})

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: 'absolute',
  left: 0,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const scrollButtonStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 25,
  backgroundColor: 'white',
  color: violet.violet11,
  cursor: 'default',
}

const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton, scrollButtonStyles)

const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton, scrollButtonStyles)

// Exports
export const Select = SelectPrimitive.Root
export const SelectTrigger = StyledTrigger
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = StyledIcon
export const SelectViewport = StyledViewport
export const SelectItem = StyledItem
export const SelectItemText = SelectPrimitive.ItemText
export const SelectItemIndicator = StyledItemIndicator
export const SelectScrollUpButton = StyledScrollUpButton
export const SelectScrollDownButton = StyledScrollDownButton
