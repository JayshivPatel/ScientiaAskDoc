import React from "react"
import styles from "./style.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons"
import { TimelineEvent } from "constants/types"
import Card from "react-bootstrap/esm/Card"
import { toDayCount } from "utils/functions"
interface Props {
  event?: TimelineEvent
  activeDay: Date
}

const ModuleEventCard: React.FC<Props> = ({ event, activeDay }) => {
  if (!event) return null
  const timeLeft = toDayCount(event.endDate) - toDayCount(activeDay)
  let assessmentStyle = styles.blueCard
  let icon = undefined
  let borderColour = "transparent"
  let dateElements: string[] = ["End: ", event.endDate.toLocaleDateString()]
  switch (event.assessment) {
    case "required":
      assessmentStyle = styles.blueCard
      break
    case "assessed":
      assessmentStyle = styles.tealCard
      break
    case "group":
      assessmentStyle = styles.redCard
      break
    case "unassessed":
      assessmentStyle = styles.unassessed
      break
    case "exam":
      assessmentStyle = styles.indigoCard
      break
  }
  switch (event.status) {
    case "due":
      dateElements = ["Due In:", `${timeLeft} days`]
      borderColour = "var(--primary-text-color)"
      break
    case "unreleased":
      dateElements = ["Start: ", event.startDate.toLocaleDateString()]
      break
    case "late":
      borderColour = "var(--primary-text-color)"
      icon = faBullhorn
      break
    case "missed":
      icon = faExclamationCircle
      break
    case "complete":
      icon = faCheckCircle
      break
  }
  return (
    <Card
      className={styles.submissionCard}
      style={{ height: "100%", cursor: "pointer" }}>
      <Card.Body>
        <div>
          <span className={styles.eventTitle}>
            <span className={styles.eventPrefix}>{event.prefix}</span>
            &nbsp;{event.title}
          </span>
          <div className={styles.eventInfo}>
            <div className={assessmentStyle}>{event.assessment}</div>
            <div
              className={styles.eventInfoElement}
              style={{ borderColor: borderColour }}>
              {event.status}
              {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
            </div>
          </div>
        </div>
        <div style={{ marginTop: "1.25rem" }}>
          <span className={styles.dateHeading}>{dateElements[0]}</span>
          <span className={styles.date}>{dateElements[1]}</span>
        </div>
      </Card.Body>
    </Card>
  )
}

export default ModuleEventCard
