import React, {useState} from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
  faBullhorn,
  faCheckCircle,
  faEnvelope,
  faExclamationCircle,
  faTimes,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons"
import FileItemRow from "components/rows/FileItemRow"
import {resourceTypeToIcon} from "components/pages/modulePages/ModuleResources/utils"
import {TimelineEvent} from "constants/types"
import {toDayCount, toEventDateTime} from "utils/functions"
import SubmissionSection from "../../sections/SubmissionSection"

interface Props {
  event?: TimelineEvent
  show: boolean
  onHide: () => void
  activeDay: Date
}

const EventModal: React.FC<Props> = ({event, show, onHide, activeDay}) => {

  const [viewSubmission, setViewSubmission] = useState<boolean>(false);

  if (!event) return null
  const timeLeft = toDayCount(event.endDate) - toDayCount(activeDay)
  let assessmentStyle = styles.blueCard
  let icon: IconDefinition | undefined = undefined
  let borderColour = "transparent"
  let displayText: string
  switch (event.assessment) {
    case "required":
      assessmentStyle = styles.blueCard
      displayText = "Unassessed Submission"
      break
    case "assessed":
      assessmentStyle = styles.tealCard
      displayText = "Individual Assessed"
      break
    case "group":
      assessmentStyle = styles.redCard
      displayText = "Group Assessed"
      break
    case "unassessed":
      assessmentStyle = styles.cyanCard
      displayText = "Unassessed"
      break
    case "exam":
      assessmentStyle = styles.indigoCard
      displayText = "Written Exam"
      break
  }
  switch (event.status) {
    case "due":
      borderColour = "var(--primary-text-color)"
      break
    case "unreleased":
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

  const ModalInfo = (
    <>
      {dummy.map(({title, type, tags, id}: any) => (
        <FileItemRow
          title={title}
          tags={tags}
          icon={resourceTypeToIcon(type)}
          onClick={() => {
          }}
          key={id}
        />
      ))}
    </>
  )

  const footerAttributes = ((): [string, () => void] | undefined => {
    if (viewSubmission) {
      return ["Back", () => setViewSubmission(false)]
    }
    if (event.status !== "unreleased" && timeLeft >= -1) {
      return ["Submit", () => setViewSubmission(true)]
    }
    return undefined
  })()

  const mainSection = viewSubmission ? 
    (
      <SubmissionSection 
        event={event} 
        activeDay={activeDay}
      />
    )
  : ModalInfo

  return (
    <Modal
      className={styles.eventModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={() => {onHide(); setViewSubmission(false)}}
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          href={`mailto:${event.owner}@ic.ac.uk?subject=Regarding ${event.title}`}
          target="_blank">
          <FontAwesomeIcon className={styles.buttonIcon} icon={faEnvelope}/>
        </Button>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={() => {onHide(); setViewSubmission(false)}}>
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes}/>
        </Button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <div>
          <span className={styles.eventPrefix}>{event.prefix}</span>
          <span className={styles.eventTitle}>&nbsp;{event.title}</span>
          <div className={styles.eventInfo}>
            <div className={assessmentStyle}>{displayText}</div>
            <div
              className={styles.eventInfoElement}
              style={{borderColor: borderColour}}>
              {event.status}
              {icon && <FontAwesomeIcon className={styles.icon} icon={icon}/>}
            </div>
          </div>
          <div className={styles.eventTimeInfo}>
            <span className={styles.startDateHeading}>Start:</span>
            <span className={styles.startDate}>
            {toEventDateTime(event.startDate)}
          </span>
            <span className={styles.endDateHeading}>End:</span>
            <span className={styles.endDate}>
            {toEventDateTime(event.endDate)}
          </span>
            {event.status !== "unreleased" && timeLeft >= 0 && (
              <>
                <span className={styles.daysHeading}>Due In:</span>
                <span className={styles.daysLeft}>{`${timeLeft} days`}</span>
              </>
            )}
          </div>
          <div className={styles.sectionHeaderContainer}>
            <span className={styles.sectionHeader}>{viewSubmission ? "Submission" : "Given"}</span>
          </div>
          {mainSection}
        </div>
      </Modal.Body>
      {footerAttributes && (
        <Modal.Footer className={styles.modalFooter}>
          <Button 
            variant="secondary" 
            className={styles.submitButton} 
            onClick={footerAttributes[1]}
          >
            {footerAttributes[0]}
          </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
}

const dummy = [
  {
    title: "spec-112-1.pdf",
    type: "pdf",
    tags: ["Specification"],
    id: 1,
  },
  {
    title: "task1_ans.pdf",
    tags: ["Solution"],
    type: "pdf",
    id: 2,
  },
]

export default EventModal
