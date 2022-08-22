import { DialogClose, DialogPortal, Dialog as DialogRoot } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import {
  Content,
  Overlay,
  PrimaryButton,
  SecondaryButton,
  Title,
} from '../../../styles/dialog.style'

const ContentFrame = ({
  children,
  ...props
}: {
  children: ReactNode
  props?: { [x: string]: any }
}) => (
  <DialogPortal>
    <Overlay />
    <Content {...props}>{children}</Content>
  </DialogPortal>
)

const DeleteSubmissionDialog = ({
  open,
  onOpenChange,
  onPrimaryClick = () => {},
  title,
  primaryButtonText,
  secondaryButtonText,
  children,
}: {
  open: boolean
  onOpenChange: (_: boolean) => void
  onPrimaryClick?: () => void
  title?: string
  primaryButtonText?: string
  secondaryButtonText?: string
  children?: ReactNode
}) => (
  <DialogRoot open={open} onOpenChange={onOpenChange}>
    <ContentFrame>
      {title && <Title>{title}</Title>}
      {children}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {secondaryButtonText && (
          <DialogClose asChild>
            <SecondaryButton style={{ display: 'inline-block', width: '6rem' }}>
              {secondaryButtonText}
            </SecondaryButton>
          </DialogClose>
        )}
        {primaryButtonText && (
          <PrimaryButton
            type="submit"
            style={{ display: 'inline-block', marginLeft: '1rem', width: '6rem' }}
            css={{ backgroundColor: '$blue8' }}
            onClick={() => {
              onPrimaryClick()
              onOpenChange(false)
            }}
          >
            {primaryButtonText}
          </PrimaryButton>
        )}
      </div>
    </ContentFrame>
  </DialogRoot>
)

export default DeleteSubmissionDialog
