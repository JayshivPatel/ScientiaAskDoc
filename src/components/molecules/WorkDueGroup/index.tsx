import React from "react";
import SideBarCardGroup from "../SideBarCardGroup";
import { eventTypes } from "components/atoms/SideBarCard";
import { eventsData } from "components/pages/Timeline/eventsData";
import { TimelineEvent } from "constants/types";

export interface WorkDueGroupProps {
	filter?: String;
	onEventClick: (e?: TimelineEvent) => void;
}

const WorkDueGroup: React.FC<WorkDueGroupProps> = ({
	filter,
	onEventClick,
}: WorkDueGroupProps) => {
  let timeOptions = {
    timeZone: "Europe/London",
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
    weekday: "short",
    day: "2-digit",
    month: "short",
	};
	
	function handleEventClick(id?: number) {
		const event = eventsData.find((e) => e.id === id);
		onEventClick(event);
	}

  return (
    <SideBarCardGroup
			title="Work Due"
			onCardClick={handleEventClick}
      events={eventsData
        .filter(({ status }) => status === "due" || status === "late")
        .filter(
          ({ moduleCode }) => filter === undefined || moduleCode === filter
        )
        .map(({ title, moduleCode, id, endDate, prefix, assessment }) => {
          let colorType: eventTypes;
          switch (assessment) {
            case "required":
              colorType = eventTypes.BlueCard;
              break;
            case "assessed":
              colorType = eventTypes.GreenCard;
              break;
            case "exam":
              colorType = eventTypes.IndigoCard;
              break;
            case "unassessed":
              colorType = eventTypes.CyanCard;
              break;
            case "group":
              colorType = eventTypes.RedCard;
              break;
            default:
              colorType = eventTypes.GreenCard;
              break;
          }
          return {
            title: `${prefix} : ${moduleCode}`,
            subtitle: title,
						content: endDate.toLocaleString("en-GB", timeOptions),
						id: id,
            type: colorType,
          };
        })}
    />
  );
};

export default WorkDueGroup;