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
import ModuleEventCard from "components/atoms/ModuleEventCard";
import Col from "react-bootstrap/esm/Col";
import classNames from "classnames";

interface Props {
  moduleID: string;
}
const ModuleSubmissions: React.FC<Props> = ({ moduleID }) => {
  let [showModal, setShowModal] = useState(false);
  let [activeEvent, setActiveEvent] = useState<TimelineEvent | undefined>(
    undefined
  );
  let activeDay = new Date("2020-10-12");
  return (
    <>
      <MyBreadcrumbs/>
      <EventModal
        event={activeEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
        activeDay={activeDay}
      />
      <Row>
        {eventsData
          .filter(({ moduleCode }) => moduleCode === moduleID)
          .map((e) => (
            <Col
              onClick={() => {
                setActiveEvent(e);
                setShowModal(true);
              }}
            >
              <ModuleEventCard event={e} activeDay={activeDay} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ModuleSubmissions;
