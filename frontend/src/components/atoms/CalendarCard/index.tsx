import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import classNames from "classnames";

export interface CalendarCardProps {
  type: eventTypes;
  title: string;
  subtitle: string;
  content: string;
}

export enum eventTypes {
  Lecture = "Lecture",
  Labs = "Labs",
  Deadline = "Deadline",
}

const CalendarCard: React.FC<CalendarCardProps> = ({
  type,
  title,
  subtitle,
  content,
}: CalendarCardProps) => {
  return (
    <Card className={classNames(styles.calendarCard, getStyle(type))}>
      <Card.Body>
        <Card.Title>
          {type}: {title}
        </Card.Title>
        <Card.Subtitle>{subtitle}</Card.Subtitle>
        <Card.Text>{content}</Card.Text>
      </Card.Body>
    </Card>
  );
};

function getStyle(type: eventTypes): String {
  switch (type) {
    case eventTypes.Lecture:
      return styles.calendarLecture;
    case eventTypes.Labs:
      return styles.calendarLabs;
    case eventTypes.Deadline:
      return styles.calendarDeadline;
    default:
      return styles.calendarLecture;
  }
}

export default CalendarCard;
