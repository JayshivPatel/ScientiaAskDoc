import React from "react";
import styles from "./style.module.scss";
export interface ModuleHeadingprops {
  numWeeks: number;
  activeDay: Date;
  termStart: Date;
}

const DayIndicatorGrid: React.FC<ModuleHeadingprops> = ({
  numWeeks,
  activeDay,
  termStart,
}) => {
  const activeColumn =
    Math.ceil(
      ((activeDay.getTime() - termStart.getTime()) / 86400000 / 7) * 6
    ) + 1;

  return (
    <div
      className={styles.dayIndicatorGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem`,
      }}
    >
      <div
        className={styles.dayIndicatorColumn}
        style={{
          visibility:
            activeDay.getDay() === 6 || activeDay.getDay() === 0
              ? "hidden"
              : "visible",
          gridColumn: `${activeColumn} / ${activeColumn + 1}`,
        }}
      ></div>
    </div>
  );
};

export default DayIndicatorGrid;
