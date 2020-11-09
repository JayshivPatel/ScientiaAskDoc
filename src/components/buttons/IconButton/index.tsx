import React from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Button from "react-bootstrap/Button"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"

interface IconButtonProps {
  buttonProps?: any
  tooltip?: string
  onClick?: (e: MouseEvent) => void
  icon: IconDefinition
  circular?: boolean
  warning?: boolean
}

const IconButton: React.FC<IconButtonProps> = ({
  buttonProps,
  tooltip,
  onClick,
  icon,
  circular = false,
  warning = false
}) => {
  const button = () => (
    <Button
      {...buttonProps}
      variant="secondary"
      className={classNames(
        circular ? styles.circularButton : styles.sectionHeaderButton, 
        styles.iconButton,
        warning ? styles.warningButton : undefined,
      )}
      onClick={onClick}>
      <FontAwesomeIcon className={styles.buttonIcon} icon={icon} />
    </Button>
  )

  if (tooltip) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-${tooltip}`} style={{ zIndex: 99999 }}>{tooltip}</Tooltip>}>
        {button()}
      </OverlayTrigger>
    )
  }
  return button()
}

export default IconButton
