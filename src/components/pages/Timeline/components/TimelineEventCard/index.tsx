import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
export interface TimelineEventProps {
  title: string;
  startColumn: number;
  endColumn: number;
	rowNumber: number;
	type: string;
	onClick: (event: React.MouseEvent) => void;
}

const TimelineEventCard: React.FC<TimelineEventProps> = ({
	title,
	type,
  startColumn,
  endColumn,
	rowNumber,
	onClick,
}) => {
	let typeStyle = styles.tutorialEvent;
	switch (type) {
		case "tutorial":
			typeStyle = styles.tutorialEvent;
			break;
		case "coursework":
			typeStyle = styles.courseworkEvent;
			break;
	}

  return (
    <div
			className={classNames(styles.timelineEvent, typeStyle)}
			onClick={onClick}
      style={{ gridColumn: `${startColumn} / ${endColumn}`, gridRow: `${rowNumber}` }}
    >
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
