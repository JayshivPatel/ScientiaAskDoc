import React, { useState } from "react";
import Dandruff from "components/molecules/Dandruff";
import EventModal from "components/organisms/EventModal";
import { TimelineEvent } from "constants/types";
import { eventsData } from "../Timeline/eventsData";

interface Props {
  moduleID: string;
}
const ModuleSubmissions: React.FC<Props> = ({ moduleID }) => {
  let [showModal, setShowModal] = useState(false);
  let [activeEvent, setActiveEvent] = useState<TimelineEvent | undefined>(
    undefined
  );
  return (
    <>
      <Dandruff heading="Submissions" />
      <EventModal
        event={activeEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
        activeDay={new Date("2020-10-12")}
      />
      {eventsData
        .filter(({ moduleCode }) => moduleCode === moduleID)
        .map((e) => (
          <p
            key={e.id}
            onClick={() => {
              setActiveEvent(e);
              setShowModal(true);
            }}
          >
            {e.title}
          </p>
        ))}
    </>
  );
};

export default ModuleSubmissions;
