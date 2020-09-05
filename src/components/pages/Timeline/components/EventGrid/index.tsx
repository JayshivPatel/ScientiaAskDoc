import React from "react";
import styles from "./style.module.scss";
import { TimelineEvent, ModuleTracks } from "../..";
import TimelineEventCard from "../TimelineEventCard";
export interface EventGridProps {
  numWeeks: number;
  trackHeight: number;
  modulesList: any[];
  moduleTracks: ModuleTracks;
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
  moduleTracks,
}) => {		
	//calculate event positions
	let eventPositions: EventDisplay[] = [];

	// Generates template for rows
  let gridTemplateRows: string = "";
  for (let i = 0; i < modulesList.length; i++) {
    const code = modulesList[i].code;
    const moduleTrack = moduleTracks[code];
    moduleTrack.forEach(() => (gridTemplateRows += `${trackHeight}rem `));
    gridTemplateRows +=
      i === 0 || i === modulesList.length - 1 ? "0.3125rem " : "0.625rem ";
  }

  return (
    <div
      className={styles.timelineCardGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem)`,
        gridTemplateRows: gridTemplateRows,
      }}
    >
      {eventPositions.map(({ title, startColumn, endColumn, rowNumber }) => (
        <TimelineEventCard
          title={title}
          startColumn={startColumn}
          endColumn={endColumn}
          rowNumber={rowNumber}
        />
      ))}
    </div>
  );
};

export default EventGrid;
