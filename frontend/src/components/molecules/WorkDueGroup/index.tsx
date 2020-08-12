import React from "react";
import SideBarCardGroup from "../SideBarCardGroup";
import { eventTypes } from "components/atoms/SideBarCard";

const WorkDueGroup: React.FC = () => {
  return (
    <SideBarCardGroup
      title="Work Due"
      events={events.map(({ type, title, subtitle }) => {
        let colorType: eventTypes;
        switch (type) {
          case "tutorial":
            colorType = eventTypes.BlueCard;
            break;
          default:
            colorType = eventTypes.GreenCard;
            break;
        }
        return { title, subtitle, type: colorType };
      })}
    />
  );
};

export default WorkDueGroup;

let events = [
  {
    type: "tutorial",
    title: "Tutorial 1",
    subtitle: "CO112",
  },
  {
    type: "coursework",
    title: "Coursework 1",
    subtitle: "CO112",
  },
  {
    type: "coursework",
    title: "Coursework 2",
    subtitle: "CO140",
  },
  {
    type: "tutorial",
    title: "PPT2",
    subtitle: "CO142",
  },
  {
    type: "tutorial",
    title: "PMT3",
    subtitle: "CO120.2",
  },
];
