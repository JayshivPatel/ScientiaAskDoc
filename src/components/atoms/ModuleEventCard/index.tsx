import React from "react";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { TimelineEvent } from "constants/types";
import Card from "react-bootstrap/esm/Card";
interface Props {
  event?: TimelineEvent;
  activeDay: Date;
}

const ModuleEventCard: React.FC<Props> = ({ event, activeDay }) => {
  if (!event) return null;
  const timeLeft = event.endDate.getTime() - activeDay.getTime();
  let assessmentStyle = styles.unassessedSubmission;
  let icon = undefined;
  let borderColour = "transparent";

  switch (event.assessment) {
    case "required":
      assessmentStyle = styles.unassessedSubmission;
      break;
    case "assessed":
      assessmentStyle = styles.individualAssessed;
      break;
    case "group":
      assessmentStyle = styles.groupAssessed;
      break;
    case "unassessed":
      assessmentStyle = styles.unassessed;
      break;
    case "exam":
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
    <Card
      className={styles.submissionCard}
      style={{ height: "100%", cursor: "pointer" }}
    >
      <Card.Header>
        <Card.Title className={styles.cardTitle}>{event.prefix}</Card.Title>
        <div style={{ display: "flex" }}>
          <Button
            variant="secondary"
            onClick={(e) => e.stopPropagation()}
            className={styles.sectionHeaderButton}
            href={`mailto:${event.owner}@ic.ac.uk?subject=Regarding ${event.title}`}
            target="_blank"
          >
            <FontAwesomeIcon className={styles.buttonIcon} icon={faEnvelope} />
          </Button>
        </div>
      </Card.Header>
      <Card.Body className={styles.modalBody}>
        <span className={styles.eventTitle}>{event.title}</span>
        <div className={styles.eventInfo}>
          <div className={assessmentStyle}>{event.assessment}</div>
          <div
            className={styles.eventInfoElement}
            style={{ borderColor: borderColour }}
          >
            {event.status}
            {icon && <FontAwesomeIcon className={styles.icon} icon={icon} />}
          </div>
        </div>
        <div className={styles.eventTimeInfo}>
          <span className={styles.startDateHeading}>Start:</span>
          <span className={styles.startDate}>
            {event.startDate.toLocaleDateString()}
          </span>
          <span className={styles.endDateHeading}>End:</span>
          <span className={styles.endDate}>
            {event.endDate.toLocaleDateString()}
          </span>
          {event.status !== "unreleased" && timeLeft >= 0 && (
            <>
              <span className={styles.daysHeading}>Due In:</span>
              <span className={styles.daysLeft}>
                {`${Math.floor(timeLeft / 86400000)} days`}
              </span>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ModuleEventCard;
