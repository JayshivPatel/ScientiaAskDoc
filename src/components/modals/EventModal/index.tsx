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

interface Props {
  event?: TimelineEvent
  show: boolean
  onHide: any
  activeDay: Date
}

const EventModal: React.FC<Props> = ({event, show, onHide, activeDay}) => {

  const [step, setStep] = useState<number>(0);

  const nextStep = () => {
    setStep(step + 1);
  }

  const prevStep = () => {
    setStep(step - 1);
  }

  const resetStep = () => {
    setStep(0);
  }

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

  const ModalInfoPage =
    <Modal
      className={styles.eventModal}
      dialogClassName={styles.modal}
      show={show}
      onClose={resetStep}
      onHide={onHide}
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
          onClick={onHide}>
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
            <span className={styles.sectionHeader}>Given</span>
          </div>
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
        </div>
      </Modal.Body>
      {event.status !== "unreleased" && timeLeft >= -1 && (
        <Modal.Footer className={styles.modalFooter}>
          <Button variant="secondary" className={styles.submitButton} onClick={nextStep}>
            Submit
          </Button>
        </Modal.Footer>
      )}
    </Modal>

  const ModalSubmissionDeclaration =


  switch (step) {
    case 0:
      return ModalInfoPage
    case 1:

    case 2:

    case 3:

  }
  return null;
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
