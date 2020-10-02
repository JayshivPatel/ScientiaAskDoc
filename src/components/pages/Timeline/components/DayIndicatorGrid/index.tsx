import React from "react"
import styles from "./style.module.scss"

export interface DayIndicatorGridProps {
  numWeeks: number
  activeDay: Date
  activeColumn: number
  isInTerm: (date: Date) => boolean
}

const DayIndicatorGrid: React.FC<DayIndicatorGridProps> = ({
  numWeeks,
  activeDay,
  activeColumn,
  isInTerm,
}) => {
  return (
    <div
      className={styles.dayIndicatorGrid}
      style={{
        gridTemplateColumns: `repeat(${numWeeks}, 3rem 3rem 3rem 3rem 3rem 0.625rem`,
      }}>
      <div
        className={styles.dayIndicatorColumn}
        style={{
          visibility:
            activeDay.getDay() === 6 ||
            activeDay.getDay() === 0 ||
            !isInTerm(activeDay)
              ? "hidden"
              : "visible",
          gridColumn: `${activeColumn} / ${activeColumn + 1}`,
        }}></div>
    </div>
  )
}

export default DayIndicatorGrid
