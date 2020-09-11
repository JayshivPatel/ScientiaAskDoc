import React, { useEffect, useState } from "react";
import { eventTypes } from "components/cards/SideBarCard";
import SideBarCardGroup from "../SideBarCardGroup";
import { addDays } from "utils/functions";
import useLocalStorage from "react-use-localstorage";

type CalendarEvent = {
  type: string;
  title: string;
  subtitle: string;
  content: string;
};

const CalendarGroup: React.FC = () => {
  let [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarID] = useLocalStorage("calendarID", "");

  useEffect(() => {
    const timeRange: any = {};
    timeRange.intervalStart = new Date("2020-03-13");
    timeRange.intervalEnd = addDays(timeRange.intervalStart, 1);

    let url: URL = new URL(`http://localhost:4000/${calendarID}`);
    Object.keys(timeRange).forEach((key) =>
      url.searchParams.append(key, timeRange[key])
    );

    fetch(url.toString(), {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          let currEvents: CalendarEvent[] = [];
          data.forEach((element: any) => {
            const timeStart = toShortTimeString(element.start);
            const timeEnd = toShortTimeString(element.end);
            console.log(element.catorgory);
            currEvents.push({
              type: element.catorgory,
              title: element.summary,
              subtitle: `${timeStart} - ${timeEnd}`,
              content: element.location,
            });
          });
          setEvents(currEvents);
        }
      });
  }, [setEvents, calendarID]);

  return (
    <SideBarCardGroup
      title="Today"
      events={events.map(({ type, title, subtitle, content }) => {
        let colorType: eventTypes;
        switch (type) {
          case "Lecture":
            colorType = eventTypes.BlueCard;
            break;
          case "Laboratory Session":
            colorType = eventTypes.RedCard;
            break;
          default:
            colorType = eventTypes.GreenCard;
            break;
        }
        return {
          title: `${title}`,
          subtitle,
          content,
          type: colorType,
        };
      })}
    />
  );
};

function toShortTimeString(date: Date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
export default CalendarGroup;
