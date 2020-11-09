import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import IconButton from 'components/buttons/IconButton';
import IconTextButton from 'components/buttons/IconTextButton';
import React from 'react'
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface ButtonDefinition {
  icon: IconDefinition,
  text: string,
  tooltip?: string,
  onClick?: () => void
  warning?: boolean
}

interface Props {
  actions: ButtonDefinition[]
}

const OperationButtons: React.FC<Props> = ({
  actions,
}) => {

  return (
    <>
      {actions.map(({ icon, text, tooltip, onClick, warning }) => {
        return <IconButton icon={icon} tooltip={tooltip} onClick={onClick} warning={warning} circular/>
      })}
    </>
  )
}

export default OperationButtons