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
  onClick: any
  icon: IconDefinition
}

const IconButton: React.FC<IconButtonProps> = ({
  buttonProps,
  tooltip,
  onClick,
  icon,
}) => {
  const button = () => (
    <Button
      {...buttonProps}
      variant="secondary"
      className={classNames(styles.sectionHeaderButton, styles.iconButton)}
      onClick={onClick}>
      <FontAwesomeIcon className={styles.buttonIcon} icon={icon} />
    </Button>
  )

  if (tooltip) {
    return (
      <OverlayTrigger
        overlay={<Tooltip id={`tooltip-${tooltip}`}>{tooltip}</Tooltip>}>
        {button()}
      </OverlayTrigger>
    )
  }
  return button()
}

export default IconButton
