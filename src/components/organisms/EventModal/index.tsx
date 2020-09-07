import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faEnvelope,
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import FileListItem from "components/atoms/FileListItem";
import { resourceTypeToIcon } from "components/pages/ModuleResources/utils";
import { TimelineEvent } from "constants/types";
interface Props {
  event?: TimelineEvent;
  show: boolean;
  onHide: any;
}

const EventModal: React.FC<Props> = ({ event, show, onHide }) => {
  if (!event) return null;
  let assessmentStyle = styles.unassessedSubmission;
  let icon = undefined;
  let borderColour = "transparent";
  switch (event.assessment) {
    case "unassessed submission":
      assessmentStyle = styles.unassessedSubmission;
      break;
    case "individual assessed":
      assessmentStyle = styles.individualAssessed;
      break;
    case "group assessed":
      assessmentStyle = styles.groupAssessed;
      break;
    case "unassessed":
      assessmentStyle = styles.unassessed;
      break;
    case "written exam":
      assessmentStyle = styles.writtenExam;
      break;
  }
  switch (event.status) {
    case "due":
      borderColour = "var(--primary-text-color)";
      break;
    case "unreleased":
      break;
    case "late":
      borderColour = "var(--primary-text-color)";
      icon = faBullhorn;
      break;
    case "missed":
      icon = faExclamationCircle;
      break;
    case "complete":
      icon = faCheckCircle;
      break;
  }
  return (
    <Modal
      className={styles.eventModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>{event.prefix}</Modal.Title>
        <div style={{ display: "flex" }}>
          <Button
            variant="secondary"
            className={styles.sectionHeaderButton}
            href={`mailto:${event.owner}@ic.ac.uk?subject=Regarding ${event.title}`}
            target="_blank"
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faEnvelope} />
          </Button>
          <Button
            variant="secondary"
            className={styles.sectionHeaderButton}
            onClick={onHide}
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
          </Button>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <span className={styles.eventTitle}>{event.title}</span>
        <div className={styles.eventInfo}>
          <div className={assessmentStyle}>{event.assessment}</div>
          <div className={styles.eventInfoElement} style={{borderColor:borderColour}}>
            {event.status}
            {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
          </div>
        </div>
        <div className={styles.eventTimeInfo}>
          <span className={styles.startDateHeading}>Issued:</span>
          <span className={styles.startDate}>
            {event.startDate.toLocaleDateString()}
          </span>
          <span className={styles.endDateHeading}>Due:</span>
          <span className={styles.endDate}>
            {event.endDate.toLocaleDateString()}
          </span>
        </div>
        <div className={styles.sectionHeaderContainer}>
          <span className={styles.sectionHeader}>Given</span>
        </div>
        {dummy.map(({ title, type, tags, id }: any) => (
          <FileListItem
            title={title}
            tags={tags}
            icon={resourceTypeToIcon(type)}
            onClick={() => {}}
            key={id}
          />
        ))}
      </Modal.Body>
      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" className={styles.submitButton}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

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
];

export default EventModal;
