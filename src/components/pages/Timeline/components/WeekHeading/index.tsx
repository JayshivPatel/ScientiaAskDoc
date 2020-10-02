import React from "react"
import Card from "react-bootstrap/Card"
import styles from "./style.module.scss"
import { toDayCount } from "utils/functions"

export interface WeekHeadingProps {
  weekNumber: number
  dateRangeStart: Date
  dateRangeEnd: Date
  activeDay: Date
}

let days = ["Mon", "Tue", "Wed", "Thu", "Fri"]

const WeekHeading: React.FC<WeekHeadingProps> = ({
  weekNumber,
  dateRangeStart,
  dateRangeEnd,
  activeDay,
}) => {
  return (
    <Card className={styles.weekCard}>
      <Card.Header>
        <div className={styles.weekHeading}>Week {weekNumber}</div>
        <div className={styles.weekDateRange}>
          {formatDate(dateRangeStart, dateRangeEnd)}
        </div>
      </Card.Header>
      <Card.Body>
        {days.map((day, i) => {
          let isActive =
            toDayCount(dateRangeStart) + i === toDayCount(activeDay)
          return (
            <div
              key={day}
              className={isActive ? styles.activeDay : styles.dayIndicator}>
              {day}
            </div>
          )
        })}
      </Card.Body>
    </Card>
  )
}

export default WeekHeading

function formatDate(dateRangeStart: Date, dateRangeEnd: Date) {
  const startMonth = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(dateRangeStart)
  const startDay = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(dateRangeStart)
  const endMonth = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(dateRangeEnd)
  const endDay = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(dateRangeEnd)
  return `${startDay}/${startMonth} - ${endDay}/${endMonth}`
}
