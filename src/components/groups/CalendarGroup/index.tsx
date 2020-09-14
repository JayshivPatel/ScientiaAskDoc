import React, { useEffect, useState } from "react";
import { eventTypes } from "components/cards/SideBarCard";
import SideBarCardGroup from "../SideBarCardGroup";
import { addDays } from "utils/functions";
import useLocalStorage from "react-use-localstorage";
import { api } from "constants/routes";
import { CalendarEvent } from "constants/types";

interface Props {
  onCalendarClick: (e?: CalendarEvent) => void;
  onSettingsClick: (event?: React.MouseEvent<Element, MouseEvent>) => void;
}
const CalendarGroup: React.FC<Props> = ({
  onCalendarClick,
  onSettingsClick,
}) => {
  let [events, setEvents] = useState<CalendarEvent[]>([]);
  const [calendarID] = useLocalStorage("calendarID", "");

  useEffect(() => {
    const timeRange: any = {};
    timeRange.intervalStart = new Date("2020-03-09");
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
          data.sort(sortEvents);
          setEvents(data);
        }
      });
  }, [setEvents, calendarID]);

  let eventsData = events.map(
    ({ summary, location, start, end, catorgory }, i) => {
      const timeStart = toShortTimeString(start);
      const timeEnd = toShortTimeString(end);
      let colorType: eventTypes;
      switch (catorgory) {
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
        title: summary,
        subtitle: `${timeStart} - ${timeEnd}`,
        content: location,
        type: colorType,
        id: i,
      };
    }
  );

  return (
    <SideBarCardGroup
      title="Today"
      maxHeight={`calc(${window.innerHeight}px - 25rem)`}
      onCardClick={(id) => {
        if (id !== undefined) {
          onCalendarClick(events[id]);
        } else if (calendarID === "") {
          onSettingsClick();
        }
      }}
      events={
        calendarID === ""
          ? [{ title: "Not Configured", type: eventTypes.BlueCard }]
          : eventsData.length === 0
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
