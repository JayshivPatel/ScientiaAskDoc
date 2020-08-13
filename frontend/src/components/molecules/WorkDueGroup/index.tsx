import React from "react";
import SideBarCardGroup from "../SideBarCardGroup";
import { eventTypes } from "components/atoms/SideBarCard";

export interface WorkDueGroupProps {
  filter?: String;
}

const WorkDueGroup: React.FC<WorkDueGroupProps> = ({
  filter
}: WorkDueGroupProps) => {
  return (
    <SideBarCardGroup
      title="Work Due"
      events={events
        .filter(({ subtitle }) => filter === undefined || subtitle === filter)
        .map(({ type, title, subtitle, content }) => {
          let colorType: eventTypes;
          switch (type) {
            case "tutorial":
              colorType = eventTypes.BlueCard;
              break;
            default:
              colorType = eventTypes.GreenCard;
              break;
          }

          return {
            type: colorType,
            title,
            subtitle: filter === undefined ? subtitle : undefined,
            content
          };
        })}
    />
  );
};

export default WorkDueGroup;

let events = [
  {
    type: "tutorial",
    title: "CO112",
    subtitle: "Tutorial 1",
    content: "Fri 14 Aug, 19:30"
  },
  {
    type: "coursework",
    title: "CO112",
    subtitle: "Coursework 1",
    content: "Mon 17 Aug, 17:00"
  },
  {
    type: "coursework",
    title: "CO140",
    subtitle: "Coursework 2",
    content: "Tue 18 Aug, 12:30"
  },
  {
    type: "tutorial",
    title: "CO142",
    subtitle: "PPT2",
    content: "Fri 21 Aug, 19:30"
  },
  {
    type: "tutorial",
    title: "CO120.2",
    subtitle: "PMT3",
    content: "Mon 24 Aug, 12:30"
  }
];
