import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { CalendarEvent } from "constants/types";
import { toEventDateTime } from "utils/functions";
interface Props {
  event?: CalendarEvent;
  show: boolean;
  onHide: any;
}

const CalendarModal: React.FC<Props> = ({ event, show, onHide }) => {
  if (!event) return null;
  let assessmentStyle = styles.blueCard;
  switch (event.catorgory) {
    case "Lecture":
      assessmentStyle = styles.blueCard;
      break;
    case "Laboratory Session":
      assessmentStyle = styles.redCard;
      break;
    default:
      assessmentStyle = styles.tealCard;
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
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}
        >
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <span className={styles.eventTitle}>{event.summary}</span>
        <div className={styles.eventInfo}>
          <div className={assessmentStyle}>{event.catorgory}</div>
        </div>
        <div className={styles.eventTimeInfo}>
          <span className={styles.locationHeading}>Location:</span>
          <span className={styles.location}>{event.location}</span>
          <span className={styles.startDateHeading}>Start:</span>
          <span className={styles.startDate}>
            {toEventDateTime(new Date(event.start))}
          </span>
          <span className={styles.endDateHeading}>End:</span>
          <span className={styles.endDate}>
            {toEventDateTime(new Date(event.end))}
          </span>
          <span className={styles.descriptionHeading}>Description:</span>
          <span className={styles.description}>
            {event.description
              .split("\n")
              .filter((s) => s !== "")
              .map((string) => (
                <>
                  {string}
                  <br />
                </>
              ))}
          </span>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CalendarModal;
