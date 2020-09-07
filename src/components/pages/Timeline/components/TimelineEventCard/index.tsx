import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";

export interface TimelineEventProps {
  title: string;
	prefix: string; 
	type: string;
	status: string;
  startColumn: number;
  endColumn: number;
	rowNumber: number;
	onClick: (event: React.MouseEvent) => void;
}

const TimelineEventCard: React.FC<TimelineEventProps> = ({
	title,
	prefix,
	type,
	status,
  startColumn,
  endColumn,
	rowNumber,
	onClick,
}) => {
	let typeStyle = styles.tutorialEvent;
	switch (type) {
		case "unassessed_submission":
			typeStyle = styles.tutorialEvent;
			break;
		case "individual_assessed":
			typeStyle = styles.courseworkEvent;
			break;
	}

  return (
    <div
			className={classNames(styles.timelineEvent, typeStyle)}
			onClick={onClick}
      style={{ gridColumn: `${startColumn} / ${endColumn}`, gridRow: `${rowNumber}` }}
    >
			<span className={styles.eventPrefix}>{prefix}:&nbsp;</span>
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
