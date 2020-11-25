import React from "react"
import styles from "./style.module.scss"
import classNames from "classnames"
import { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"
import Tooltip from "react-bootstrap/Tooltip"
import Button from "react-bootstrap/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface Props {
  icon: IconDefinition,
  text: string 
  tooltip?: string
  onClick?: (e: MouseEvent) => void
  buttonProps?: any
}

const IconTextButton: React.FC<Props> = ({
  icon,
  text,
  tooltip,
  onClick,
  buttonProps,
}) => {

  return (
    <OverlayTrigger
      overlay={<Tooltip id={`tooltip-${tooltip}`} style={{ zIndex: 99999 }}>{tooltip}</Tooltip>}>
      <Button
        {...buttonProps}
        variant="secondary"
        className={classNames(styles.sectionHeaderButton, styles.iconTextButton)}
        onClick={onClick}
      >
        <FontAwesomeIcon icon={icon} />
        {text}

      </Button>
    </OverlayTrigger>
  )
}

export default IconTextButton