import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import cx from "classnames";

export interface WeekHeadingProps {
  weekNumber: string;
  dateRangeStart: string;
  dateRangeEnd: string;
  activeDay: number;
}

let days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const WeekHeading: React.FC<WeekHeadingProps> = ({
  weekNumber,
  dateRangeStart,
  dateRangeEnd,
  activeDay
}) => {
  return (
    <>
      <Card className={styles.weekCard}>
        <Card.Header>
          <div className={styles.weekHeading}>Week {weekNumber}</div>
          <div className={styles.weekDateRange}>
            {dateRangeStart} - {dateRangeEnd}
          </div>
        </Card.Header>
        <Card.Body>
          {days.map(day => {
            if (activeDay === days.indexOf(day) + 1) {
              return (
                <div className={cx(styles.activeDay, styles.dayIndicator)}>
                  {day}
                </div>
              );
            } else {
              return <div className={styles.dayIndicator}>{day}</div>;
            }
          })}
        </Card.Body>
      </Card>
    </>
  );
};

export default WeekHeading;
