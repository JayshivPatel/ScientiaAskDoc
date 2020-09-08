import React from "react";
import SideBarCardGroup from "../SideBarCardGroup";
import { eventTypes } from "components/atoms/SideBarCard";
import { eventsData } from "components/pages/Timeline/eventsData";

export interface WorkDueGroupProps {
  filter?: String;
}

const WorkDueGroup: React.FC<WorkDueGroupProps> = ({
  filter,
}: WorkDueGroupProps) => {
	let timeOptions = {
		timeZone: "Europe/London",
		hourCycle: "h23",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		weekday: "short",
		day: "2-digit",
		month: "short"
	};

  return (
    <SideBarCardGroup
      title="Work Due"
			events={eventsData
        .filter(({ status }) => status === "due" || status === "late")
        .filter(({ moduleCode }) => filter === undefined || moduleCode === filter)
        .map(({ title, moduleCode, id, endDate, prefix, assessment}) => {
          let colorType: eventTypes;
          switch (assessment) {
            case "unassessed submission":
              colorType = eventTypes.BlueCard;
              break;
            default:
              colorType = eventTypes.GreenCard;
              break;
          }
					let task = `${prefix} ${title}`;
          return {
            title: filter === undefined ? moduleCode : undefined,
            subtitle:  task,
            content: endDate.toLocaleString("en-GB", timeOptions),
            type: colorType,
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
    content: "Fri 14 Aug, 19:30",
  },
];
