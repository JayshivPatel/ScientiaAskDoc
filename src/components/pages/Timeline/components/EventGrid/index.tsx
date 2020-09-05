import React from "react";
import styles from "./style.module.scss";
export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
}

const EventGrid: React.FC<EventGridProps> = ({ numWeeks, trackHeight }) => {
  return (
    <div
      className={styles.timelineCardGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem)`,
        gridTemplateRows: `${trackHeight}rem ${trackHeight}rem 0.3125rem repeat(${7}, ${trackHeight}rem ${trackHeight}rem 0.625rem) ${trackHeight}rem ${trackHeight}rem 0.3125rem`,
      }}
    >
      <div className={styles.timelineEvent} style={{ gridColumn: `1 / 9` }}>
        <span className={styles.eventTitle}>Title of the first event</span>
      </div>
      <div
        className={styles.timelineEvent}
        style={{ gridColumn: `3 / 24`, gridRow: `2` }}
      >
        <span className={styles.eventTitle}>Title of the second event</span>
      </div>
    </div>
  );
};

export default EventGrid;
