import React from "react";
import styles from "./style.module.scss";
export interface TimelineEventProps {
  title: string;
  startColumn: number;
  endColumn: number;
	rowNumber: number;
	onClick: (event: React.MouseEvent) => void;
}

const TimelineEventCard: React.FC<TimelineEventProps> = ({
  title,
  startColumn,
  endColumn,
	rowNumber,
	onClick,
}) => {
  return (
    <div
			className={styles.timelineEvent}
			onClick={onClick}
      style={{ gridColumn: `${startColumn} / ${endColumn}`, gridRow: `${rowNumber}` }}
    >
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
