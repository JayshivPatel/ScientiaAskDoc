import React from "react";
import styles from "./style.module.scss";
import { ModuleTracks } from "../..";
import TimelineEventCard from "../TimelineEventCard";
export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
  modulesList: any[];
  modulesTracks: ModuleTracks;
  dateToColumn: (date: Date) => number;
}

interface EventDisplay {
  title: string;
  id: number;
  startColumn: number;
  endColumn: number;
  rowNumber: number;
}

const EventGrid: React.FC<EventGridProps> = ({
  numWeeks,
  trackHeight,
  modulesList,
  modulesTracks,
  dateToColumn,
}) => {
  let eventPositions: EventDisplay[] = [];
  let gridTemplateRows: string = "";
  let currRow = 1;
  for (let i = 0; i < modulesList.length; i++) {
    const code = modulesList[i].code;
    const moduleTracks = modulesTracks[code];

    for (const moduleTrack of moduleTracks) {
      for (const event of moduleTrack) {
        eventPositions.push({
          title: event.title,
          id: event.id,
          startColumn: dateToColumn(event.startDate),
          endColumn: dateToColumn(event.endDate) + 1,
          rowNumber: currRow,
        });
      }
      gridTemplateRows += `${trackHeight}rem `;
      currRow += 1;
    }
    gridTemplateRows +=
      i === 0 || i === modulesList.length - 1 ? "0.3125rem " : "0.625rem ";
    currRow += 1;
  }

  return (
    <div
      className={styles.timelineCardGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem)`,
        gridTemplateRows: gridTemplateRows,
      }}
    >
      {eventPositions.map(
        ({ title, startColumn, id, endColumn, rowNumber }) => (
          <TimelineEventCard
            title={title}
            key={id}
            startColumn={startColumn}
            endColumn={endColumn}
            rowNumber={rowNumber}
          />
        )
      )}
    </div>
  );
};

export default EventGrid;
