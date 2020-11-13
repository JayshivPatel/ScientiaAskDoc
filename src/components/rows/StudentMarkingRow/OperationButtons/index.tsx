import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import IconButton from 'components/buttons/IconButton';
import React from 'react'
import styles from './style.module.scss'

export interface ButtonDefinition {
  icon: IconDefinition,
  text: string,
  tooltip?: string,
  onClick?: () => void
  warning?: boolean
}

interface Props {
  actions: ButtonDefinition[]
  theme?: "white"
}

const OperationButtons: React.FC<Props> = ({
  actions,
  theme
}) => {

  return (
    <div className={styles.buttonGroup}>
      {actions.map(({ icon, text, tooltip, onClick, warning }, index) => {
        return <IconButton 
          key={`action_${index}`} 
          icon={icon} 
          tooltip={tooltip} 
          onClick={onClick} 
          circular 
          theme={theme}
          hoverTheme={warning ? "warning" : theme ? "teal" : "normal"}
        />
      })}
    </div>
  )
}

export default OperationButtons