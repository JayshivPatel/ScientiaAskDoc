import React, { useEffect, useState } from "react";
import { eventTypes } from "components/cards/SideBarCard";
import SideBarCardGroup from "../SideBarCardGroup";
import { addDays } from "utils/functions";
import useLocalStorage from "react-use-localstorage";
import { api } from "constants/routes";
import { CalendarEvent } from "constants/types";

const CalendarGroup: React.FC = () => {
  let [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarID] = useLocalStorage("calendarID", "");

  useEffect(() => {
    const timeRange: any = {};
    timeRange.intervalStart = new Date("2020-03-13");
    timeRange.intervalEnd = addDays(timeRange.intervalStart, 1);

    let url: URL = new URL(api.CALENDAR_EVENTS(calendarID));
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
          data.sort(sortEvents).forEach((element: any) => {
            const timeStart = toShortTimeString(element.start);
            const timeEnd = toShortTimeString(element.end);
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

  let eventsData = events.map(({ type, title, subtitle, content }) => {
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
      title,
      subtitle,
      content,
      type: colorType,
    };
	});
	
  return (
    <SideBarCardGroup
			title="Today"
			maxHeight="calc(100vh - 25.5rem)"
      events={
        eventsData.length === 0
          ? [{ title: "No Events", type: eventTypes.BlueCard }]
          : eventsData
      }
    />
  );
};

function toShortTimeString(date: Date) {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function sortEvents(e1: any, e2: any) {
  let e1Start = new Date(e1.start);
  let e1End = new Date(e1.end);
  let e2Start = new Date(e2.start);
  let e2End = new Date(e2.end);

  if (e1Start.getTime() !== e2Start.getTime()) {
    return e1Start.getTime() - e2Start.getTime();
  }
  return e2End.getTime() - e1End.getTime();
}

export default CalendarGroup;
