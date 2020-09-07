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
      style={{ gridColumn: `${startColumn} / ${endColumn}`, gridRow: `${rowNumber}` }}
    >
			<span className={styles.eventPrefix}>{prefix}:&nbsp;</span>
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
