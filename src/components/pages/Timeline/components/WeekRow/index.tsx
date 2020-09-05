import React from "react";
import styles from "./style.module.scss";
import WeekHeading from "../WeekHeading";
import { addDays } from "utils/functions";

export interface WeekRowProps {
	numWeeks: number;
	termStart: Date;
  activeDay: Date;
}


const WeekRow: React.FC<WeekRowProps> = ({
  numWeeks,
  termStart,
  activeDay,
}) => {
  return (
		<div
		className={styles.timelineWeekRow}
		style={{ gridTemplateColumns: `repeat(${numWeeks}, 15rem)` }}
	>
		{[...Array(numWeeks)].map((_, i) => (
			<div className={styles.weekHeading} key={i}>
				<WeekHeading
					weekNumber={i + 1}
					dateRangeStart={addDays(termStart, i * 7)}
					dateRangeEnd={addDays(termStart, i * 7 + 4)}
					activeDay={activeDay}
				/>
			</div>
		))}
	</div>
  );
};

export default WeekRow;