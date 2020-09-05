import React from "react";
import styles from "./style.module.scss";
export interface TimelineEventProps {
  title: string;
  startColumn: number;
  endColumn: number;
  rowNumber: number;
}

const TimelineEventCard: React.FC<TimelineEventProps> = ({
  title,
  startColumn,
  endColumn,
  rowNumber,
}) => {
  return (
    <div
      className={styles.timelineEvent}
      style={{ gridColumn: `${startColumn} / ${endColumn}`, gridRow: `${rowNumber}` }}
    >
      <span className={styles.eventTitle}>{title}</span>
    </div>
  );
};

export default TimelineEventCard;
