import React from "react"
import styles from "./style.module.scss"
import classNames from "classnames"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import TitleSpan from "../TitleSpan"

export interface TimelineEventProps {
  title: string
  prefix: string
  assessment: string
  status: string
  startColumn: number
  endColumn: number
  rowNumber: number
  onClick: (event: React.MouseEvent) => void
}

const EventCard: React.FC<TimelineEventProps> = ({
  title,
  prefix,
  assessment,
  status,
  startColumn,
  endColumn,
  rowNumber,
  onClick,
}) => {
  let icon = undefined
  let cardColour = "blue"
  let borderColour = ""
  let isSingleDay = endColumn - startColumn < 2
  switch (assessment) {
    case "required":
      cardColour = "blue"
      break
    case "assessed":
      cardColour = "teal"
      break
    case "group":
      cardColour = "pink"
      break
    case "unassessed":
      cardColour = "cyan"
      break
    case "exam":
      cardColour = "indigo"
      break
  }

  switch (status) {
    case "due":
      borderColour = "text"
      break
    case "unreleased":
      borderColour = "background"
      break
    case "late":
      borderColour = "text"
      icon = faBullhorn
      break
    case "missed":
      borderColour = "background"
      icon = faExclamationCircle
      break
    case "complete":
      borderColour = "background"
      icon = faCheckCircle
      break
  }

  return (
    <div
      className={classNames(styles.timelineEvent)}
      onClick={onClick}
      style={{
        gridColumn: `${startColumn} / ${endColumn}`,
        gridRow: `${rowNumber}`,
        justifyContent: isSingleDay ? "center" : "space-between",
        padding: isSingleDay ? "0.25rem" : "0.5rem",
        textAlign: isSingleDay ? "center" : "left",
        backgroundColor: `var(--${cardColour}-background)`,
        color: `var(--${cardColour}-text)`,
        borderColor: `var(--${cardColour}-${borderColour})`,
      }}>
      {(!isSingleDay || !icon) && <TitleSpan isSingleDay={isSingleDay} prefix={prefix} title={title}/>}
      {icon && (
        <FontAwesomeIcon
          style={{
            marginLeft: isSingleDay ? "0rem" : "0.625rem",
          }}
          className={styles.icon}
          icon={icon}
        />
      )}
    </div>
  )
}

export default EventCard
