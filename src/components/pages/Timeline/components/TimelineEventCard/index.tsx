import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faBullhorn, faExclamationCircle, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export interface TimelineEventProps {
  title: string;
  prefix: string;
  assessment: string;
  status: string;
  startColumn: number;
  endColumn: number;
  rowNumber: number;
  onClick: (event: React.MouseEvent) => void;
}

const TimelineEventCard: React.FC<TimelineEventProps> = ({
  title,
  prefix,
  assessment,
  status,
  startColumn,
  endColumn,
  rowNumber,
  onClick,
}) => {
  let assessmentStyle = styles.unassessedSubmission;
  let icon = faEnvelope;
  let borderColor = "var(--blue-text)";
	let isSingleDay = endColumn - startColumn < 2;
  switch (assessment) {
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

  switch (status) {
    case "due": 
      icon = faEnvelope;
      break;
    case "unreleased": 
      icon = faEnvelope;
      break;
    case "late":
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
    <div
      className={classNames(styles.timelineEvent, assessmentStyle)}
      onClick={onClick}
      style={{
        gridColumn: `${startColumn} / ${endColumn}`,
        gridRow: `${rowNumber}`,
				marginLeft: isSingleDay ? ".1rem" : ".5rem",
        marginRight: isSingleDay ? ".1rem" : ".5rem",
      }}
    >
      <span className={styles.eventTitle}>
        <span
        className={styles.eventPrefix}
        style={{
          fontSize: isSingleDay ? ".9rem" : "1rem",
        }}
      >
        {prefix}&nbsp;
      </span>{title}</span>
      <FontAwesomeIcon
                className={styles.icon}
                icon={icon}
            />
    </div>
  );
};

export default TimelineEventCard;
