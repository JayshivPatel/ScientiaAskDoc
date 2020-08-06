import React from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import CalendarCard, { eventTypes, CalendarCardProps } from "components/atoms/CalendarCard";

const CalendarGroup: React.FC = () => {
  let events: CalendarCardProps[] = [
    {
      type: eventTypes.Lecture,
      title: "CO145",
      subtitle: "13:00 - 14:00",
      content: "311, Huxley Building, South Kensington Campus",
    },
    {
      type: eventTypes.Labs,
      title: "CO161",
      subtitle: "15:00 - 17:00",
      content: "219, Huxley Building, South Kensington Campus",
    },
    {
      type: eventTypes.Deadline,
      title: "CO120.1",
      subtitle: "19:00",
      content: "Haskell L Systems",
    },
  ];

  return (
    <>
      <h1 className={styles.calendarCardGroupHeading}>Today</h1>
      <div
        className={classNames("btn-group-vertical", styles.calendarCardGroup)}
        role="group"
      >
        {events.map(({ type, title, subtitle, content }) => (
          <CalendarCard
            title={title}
            type={type}
            subtitle={subtitle}
						content={content}
						key={title + type + subtitle}
          />
        ))}
      </div>
    </>
  );
};

export default CalendarGroup;
