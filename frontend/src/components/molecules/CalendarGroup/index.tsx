import React from "react";
import { eventTypes } from "components/atoms/SideBarCard";
import SideBarCardGroup from "../SideBarCardGroup";

const CalendarGroup: React.FC = () => {
  return (
    <SideBarCardGroup
      title="Today"
      events={events.map(({ type, title, subtitle, content }) => {
        let colorType: eventTypes;
        switch (type) {
          case "lecture":
            colorType = eventTypes.BlueCard;
            break;
          case "labs":
            colorType = eventTypes.RedCard;
            break;
          default:
            colorType = eventTypes.GreenCard;
            break;
        }
        return { title, subtitle, content, type: colorType };
      })}
    />
  );
};

export default CalendarGroup;

let events = [
  {
    type: "lecture",
    title: "CO142",
    subtitle: "09:00 - 11:00",
    content: "308, Huxley Building, South Kensington Campus",
  },
  {
    type: "lecture",
    title: "CO145",
    subtitle: "13:00 - 14:00",
    content: "311, Huxley Building, South Kensington Campus",
  },
  {
    type: "labs",
    title: "CO161",
    subtitle: "15:00 - 17:00",
    content: "219, Huxley Building, South Kensington Campus",
  },
  {
    type: "deadline",
    title: "CO120.1",
    subtitle: "19:00",
    content: "Haskell L Systems",
  },
];
