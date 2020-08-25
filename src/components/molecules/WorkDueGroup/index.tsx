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
        .filter(({ module }) => filter === undefined || module === filter)
        .map(({ type, module, task, content }) => {
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
            title: filter === undefined ? module : task,
            subtitle: filter === undefined ? task : undefined,
            content,
            type: colorType
          };
        })}
    />
  );
};

export default WorkDueGroup;

let events = [
  {
    type: "tutorial",
    module: "CO112",
    task: "Tutorial 1",
    content: "Fri 14 Aug, 19:30"
  },
  {
    type: "coursework",
    module: "CO112",
    task: "Coursework 1",
    content: "Mon 17 Aug, 17:00"
  },
  {
    type: "coursework",
    module: "CO140",
    task: "Coursework 2",
    content: "Tue 18 Aug, 12:30"
  },
  {
    type: "tutorial",
    module: "CO142",
    task: "PPT2",
    content: "Fri 21 Aug, 19:30"
  },
  {
    type: "tutorial",
    module: "CO120.2",
    task: "PMT3",
    content: "Mon 24 Aug, 12:30"
  }
];
