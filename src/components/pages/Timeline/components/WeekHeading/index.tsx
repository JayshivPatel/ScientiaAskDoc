import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";

export interface WeekHeadingProps {
  weekNumber: number;
  dateRangeStart: Date;
  dateRangeEnd: Date;
  activeDay: Date;
}

let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const WeekHeading: React.FC<WeekHeadingProps> = ({
  weekNumber,
  dateRangeStart,
  dateRangeEnd,
  activeDay,
}) => {
  const dateRangeStartMonth = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(dateRangeStart);
  const dateRangeStartDay = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(dateRangeStart);
  const dateRangeEndMonth = new Intl.DateTimeFormat("en", {
    month: "2-digit",
  }).format(dateRangeEnd);
  const dateRangeEndDay = new Intl.DateTimeFormat("en", {
    day: "2-digit",
  }).format(dateRangeEnd);

  return (
    <>
      <Card className={styles.weekCard}>
        <Card.Header>
          <div className={styles.weekHeading}>Week {weekNumber}</div>
          <div className={styles.weekDateRange}>
            {dateRangeStartDay}/{dateRangeStartMonth} - {dateRangeEndDay}/
            {dateRangeEndMonth}
          </div>
        </Card.Header>
        <Card.Body>
          {days.map((day, i) => {
            let isActive =
              activeDay.getTime() === dateRangeStart.getTime() + i * 86400000;
            return (
              <div
                className={isActive ? styles.activeDay : styles.dayIndicator}
              >
                {day}
              </div>
            );
          })}
        </Card.Body>
      </Card>
    </>
  );
};

export default WeekHeading;
