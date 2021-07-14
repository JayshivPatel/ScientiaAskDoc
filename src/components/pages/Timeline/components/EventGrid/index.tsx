import React from "react";
import styles from "./style.module.scss";
import { ModuleTracks } from "../..";
import EventCard from "../EventCard";
import { Module } from "constants/types";

export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
  modulesList: Module[];
  modulesTracks: ModuleTracks;
  dateToColumn: (date: Date) => number;
  isInTerm: (date: Date) => boolean;
  onEventClick: (module: string, id: number) => void;
}

interface EventDisplay {
  title: string;
  courseCode: string;
  id: number;
  prefix: string;
  status: string;
  assessment: string;
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
    const moduleTracks = modulesTracks[code] ?? [];

    for (const moduleTrack of moduleTracks) {
      for (const event of moduleTrack) {
        if (!isInTerm(event.startDate) && !isInTerm(event.endDate)) continue;
        eventPositions.push({
          title: event.title,
          courseCode: event.moduleCode,
          id: event.id,
          prefix: event.prefix,
          status: event.status,
          assessment: event.assessment,
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
        (
          {
            title,
            courseCode,
            startColumn,
            prefix,
            status,
            id,
            endColumn,
            assessment,
            rowNumber,
          },
          index
        ) => (
          <EventCard
            title={title}
            key={index}
            assessment={assessment}
            prefix={prefix}
            status={status}
            startColumn={startColumn}
            endColumn={endColumn}
            rowNumber={rowNumber}
            onClick={(e) => {
              e.preventDefault();
              onEventClick(courseCode, id);
            }}
          />
        )
      )}
    </div>
  );
};

export default EventGrid;
