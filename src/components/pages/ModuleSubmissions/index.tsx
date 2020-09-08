import React, { useState } from "react";
import Dandruff from "components/molecules/Dandruff";
import EventModal from "components/organisms/EventModal";
import { TimelineEvent } from "constants/types";
import { eventsData } from "../Timeline/eventsData";
import styles from "./style.module.scss";
import Row from "react-bootstrap/esm/Row";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faExclamationCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

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
      <MyBreadcrumbs />
      <EventModal
        event={activeEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
        activeDay={new Date("2020-10-12")}
      />
      <div className={styles.listContainer}>
        {eventsData
          .filter(({ moduleCode }) => moduleCode === moduleID)
          .map((e) => {
            let icon = undefined;
            let cardColour = "blue";
            let borderColour = "";
            switch (e.assessment) {
              case "unassessed submission":
                cardColour = "blue";
                break;
              case "individual assessed":
                cardColour = "teal";
                break;
              case "group assessed":
                cardColour = "pink";
                break;
              case "unassessed":
                cardColour = "cyan";
                break;
              case "written exam":
                cardColour = "indigo";
                break;
            }
            switch (e.status) {
              case "due":
                borderColour = "text";
                break;
              case "unreleased":
                borderColour = "background";
                break;
              case "late":
                borderColour = "text";
                icon = faBullhorn;
                break;
              case "missed":
                borderColour = "background";
                icon = faExclamationCircle;
                break;
              case "complete":
                borderColour = "background";
                icon = faCheckCircle;
                break;
            }
            return (
              <Row
                key={e.id}
                onClick={() => {
                  setActiveEvent(e);
                  setShowModal(true);
                }}
                style={{
                  backgroundColor: `var(--${cardColour}-background)`,
                  color: `var(--${cardColour}-text)`,
                  borderColor: `var(--${cardColour}-${borderColour})`,
                }}
                className={styles.listRow}
              >
                <span
                  className={styles.eventTitle}
                  style={{
                    fontSize: "1rem",
                  }}
                >
                  <span className={styles.eventPrefix}>{e.prefix}&nbsp;</span>
                  {e.title}
                </span>

                {icon && (
                  <FontAwesomeIcon className={styles.icon} icon={icon} />
                )}
              </Row>
            );
          })}
      </div>
    </>
  );
};

export default ModuleSubmissions;
