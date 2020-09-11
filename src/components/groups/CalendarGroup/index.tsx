import React, { useEffect, useState } from "react";
import { eventTypes } from "components/cards/SideBarCard";
import SideBarCardGroup from "../SideBarCardGroup";
import { addDays } from "utils/functions";

type CalendarEvent = {
  type: string;
  title: string;
  subtitle: string;
  content: string;
};

const CalendarGroup: React.FC = () => {
  let [events, setEvents] = useState<CalendarEvent[]>([]);
  let id = "XK9FBCJB1848503";
  useEffect(() => {
    const timeRange: any = {};
    timeRange.intervalStart = new Date("2020-03-13");
    timeRange.intervalEnd = addDays(timeRange.intervalStart, 1);

    let url: URL = new URL(`http://localhost:4000/${id}`);
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
            const timeStart = new Date(element.start).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            const timeEnd = new Date(element.end).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            currEvents.push({
              type: "Lecture",
              title: element.summary,
              subtitle: `${timeStart} - ${timeEnd}`,
              content: element.location,
            });
          });
          setEvents(currEvents);
        }
      });
  }, [setEvents]);

  return (
    <SideBarCardGroup
      title="Today"
      events={events.map(({ type, title, subtitle, content }) => {
        let colorType: eventTypes;
        switch (type) {
          case "Lecture":
            colorType = eventTypes.BlueCard;
            break;
          case "Labs":
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

export default CalendarGroup;
