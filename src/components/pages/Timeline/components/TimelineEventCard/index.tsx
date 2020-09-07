import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

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
	let assessmentStyle = styles.tutorialEvent;
	let isSingleDay = endColumn - startColumn < 2;
  switch (assessment) {
    case "unassessed_submission":
      assessmentStyle = styles.tutorialEvent;
      break;
    case "individual_assessed":
      assessmentStyle = styles.courseworkEvent;
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
      <span
        className={styles.eventPrefix}
        style={{
          fontSize: isSingleDay ? ".9rem" : "1rem",
        }}
      >
        {prefix}&nbsp;
      </span>
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
