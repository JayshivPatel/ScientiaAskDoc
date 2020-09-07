import React from "react";
import styles from "./style.module.scss";
import { ModuleTracks } from "../..";
import TimelineEventCard from "../TimelineEventCard";
import { Module } from "constants/types";
export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
  modulesList: Module[];
  modulesTracks: ModuleTracks;
  dateToColumn: (date: Date) => number;
  isInTerm: (date: Date) => boolean;
  onEventClick: (id: number) => void;
}

interface EventDisplay {
  title: string;
	id: number;
	type: string;
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
  isInTerm,
  onEventClick,
}) => {
  let eventPositions: EventDisplay[] = [];
  let gridTemplateRows: string = "";
  let currRow = 1;
  for (let i = 0; i < modulesList.length; i++) {
    const code = modulesList[i].code;
    const moduleTracks = modulesTracks[code];

    for (const moduleTrack of moduleTracks) {
      for (const event of moduleTrack) {
        if (!isInTerm(event.startDate) && !isInTerm(event.endDate)) continue;
        eventPositions.push({
          title: event.title,
					id: event.id,
					type: event.type,
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
        ({ title, startColumn, id, endColumn, type, rowNumber }) => (
          <TimelineEventCard
            title={title}
						key={id}
						type={type}
            startColumn={startColumn}
            endColumn={endColumn}
            rowNumber={rowNumber}
            onClick={(e) => {
              e.preventDefault();
              onEventClick(id);
            }}
          />
        )
      )}
    </div>
  );
};

export default EventGrid;