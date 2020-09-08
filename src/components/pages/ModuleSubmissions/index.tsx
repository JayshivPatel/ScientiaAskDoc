import React, { useState } from "react";
import EventModal from "components/organisms/EventModal";
import { TimelineEvent } from "constants/types";
import { eventsData } from "../Timeline/eventsData";
import Row from "react-bootstrap/esm/Row";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import ModuleEventCard from "components/atoms/ModuleEventCard";
import Col from "react-bootstrap/esm/Col";
import SearchBox from "components/molecules/SearchBox";

interface Props {
  moduleID: string;
}
const ModuleSubmissions: React.FC<Props> = ({ moduleID }) => {
  let [showModal, setShowModal] = useState(false);
  let [activeEvent, setActiveEvent] = useState<TimelineEvent | undefined>(
    undefined
	);
	let [searchText, setSearchText] = useState("");
	
  let activeDay = new Date("2020-10-12");
  return (
    <>
      <MyBreadcrumbs/>
			<SearchBox searchText={searchText} onSearchTextChange={setSearchText} />
      <EventModal
        event={activeEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
        activeDay={activeDay}
      />
      <Row style={{marginTop: "1.25rem"}}>
        {eventsData
					.filter(({ moduleCode }) => moduleCode === moduleID)
          .map((e) => (
            <Col
							xs={12}
							sm={12}
							md={6}
							lg={6}
							xl={4}
							key={e.id}
              onClick={() => {
                setActiveEvent(e);
                setShowModal(true);
							}}
							style={{marginTop: "1.25rem"}}
            >
              <ModuleEventCard event={e} activeDay={activeDay} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ModuleSubmissions;
