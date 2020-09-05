import React from "react";
import styles from "./style.module.scss";
import { TimelineEvent } from "../..";
import TimelineEventCard from "../TimelineEventCard";
export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
  events: TimelineEvent[];
}

const EventGrid: React.FC<EventGridProps> = ({
  numWeeks,
  trackHeight,
  events,
}) => {
  return (
    <div
      className={styles.timelineCardGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem)`,
        gridTemplateRows: `${trackHeight}rem ${trackHeight}rem 0.3125rem repeat(${7}, ${trackHeight}rem ${trackHeight}rem 0.625rem) ${trackHeight}rem ${trackHeight}rem 0.3125rem`,
      }}
    >
      {events.map(({ title }, i) => (
        <TimelineEventCard
          title={title}
          startColumn={i + 1}
          endColumn={i + 8}
          rowNumber={2 * i}
        />
      ))}
    </div>
  );
};

export default EventGrid;
