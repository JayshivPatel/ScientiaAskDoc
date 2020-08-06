import React from "react";
import styles from "./style.module.scss";
import Card from "react-bootstrap/Card";
import classNames from "classnames";

const CalendarGroup: React.FC = () => {
  return (
    <>
      <h1 className={styles.calendarCardGroupHeading}>Today</h1>
      <div
        className={classNames("btn-group-vertical", styles.calendarCardGroup)}
        role="group"
      >
        <Card
          className={classNames(styles.calendarCard, styles.calendarLecture)}
        >
          <Card.Body>
            <Card.Title>Lecture: CO142</Card.Title>
            <Card.Subtitle>09:00 - 11:00</Card.Subtitle>
            <Card.Text>308, Huxley Building, South Kensington Campus</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className={classNames(styles.calendarCard, styles.calendarLecture)}
        >
          <Card.Body>
            <Card.Title>Lecture: CO145</Card.Title>
            <Card.Subtitle>13:00 - 14:00</Card.Subtitle>
            <Card.Text>311, Huxley Building, South Kensington Campus</Card.Text>
          </Card.Body>
        </Card>
        <Card className={classNames(styles.calendarCard, styles.calendarLabs)}>
          <Card.Body>
            <Card.Title>Labs: CO161</Card.Title>
            <Card.Subtitle>15:00 - 17:00</Card.Subtitle>
            <Card.Text>219, Huxley Building, South Kensington Campus</Card.Text>
          </Card.Body>
        </Card>
        <Card
          className={classNames(styles.calendarCard, styles.calendarDeadline)}
        >
          <Card.Body>
            <Card.Title>Deadline: CO120.1</Card.Title>
            <Card.Subtitle>19:00</Card.Subtitle>
            <Card.Text>Haskell L Systems</Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default CalendarGroup;
