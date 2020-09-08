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

  const activeDay = new Date("2020-10-12");
  return (
    <>
      <MyBreadcrumbs />
      <SearchBox
        searchText={searchText}
        onSearchTextChange={setSearchText}
        prompts={getSearchPrompts()}
      />
      <EventModal
        event={activeEvent}
        show={showModal}
        onHide={() => setShowModal(false)}
        activeDay={activeDay}
      />
      <Row style={{ marginTop: "1.25rem" }}>
        {eventsData
          .filter(({ moduleCode }) => moduleCode === moduleID)
          .filter((e) => includeInSearchResult(e, searchText))
          .sort((e1, e2) => getIndex(e1) - getIndex(e2))
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
              style={{ marginTop: "1.25rem" }}
            >
              <ModuleEventCard event={e} activeDay={activeDay} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default ModuleSubmissions;

function includeInSearchResult(item: TimelineEvent, searchText: string) {
  const rx = /([a-z]+)\(([^)]+)\)/gi;
  let match: RegExpExecArray | null;
  let assessment = item.assessment.toLowerCase();
  let status = item.status.toLowerCase();
  let prefix = item.prefix.toLowerCase();
  let title = item.title.toLowerCase();
  searchText = searchText.toLowerCase();
  while ((match = rx.exec(searchText)) !== null) {
    switch (match[1]) {
      case "assessment":
        if (assessment !== match[2]) {
          return false;
        }
        break;
      case "status":
        if (status !== match[2]) {
          return false;
        }
        break;
      case "prefix":
        if (prefix !== match[2]) {
          return false;
        }
        break;
    }
  }
  let rest = searchText.replace(rx, "").trim();
  return title.toLowerCase().indexOf(rest) !== -1;
}

function getIndex(event: TimelineEvent) {
  const statusOrder = ["late", "due", "missed", "unreleased", "complete"];
  const assessmentOrder = [
    "exam",
    "assessed",
    "group",
    "required",
    "unassessed",
  ];
  return (
    (statusOrder.indexOf(event.status) + 1) * 5 +
    assessmentOrder.indexOf(event.assessment)
  );
}

function getSearchPrompts() {
  const assessmentList = [
    { name: "Assessed", value: "assessment(assessed)" },
    { name: "Unassessed", value: "assessment(unassessed)" },
    { name: "Required", value: "assessment(required)" },
    { name: "Group", value: "assessment(group)" },
    { name: "Exam", value: "assessment(exam)" },
  ];
  const statusList = [
    { name: "Due", value: "status(due)" },
    { name: "Late", value: "status(late)" },
    { name: "Missed", value: "status(missed)" },
    { name: "Complete", value: "status(complete)" },
    { name: "Unreleased", value: "status(unreleased)" },
  ];
  const prefixList = [
    { name: "TUT", value: "prefix(tut)" },
    { name: "CW", value: "prefix(cw)" },
  ];
  const prompts = [
    { title: "Assessment", list: assessmentList },
    { title: "Status", list: statusList },
    { title: "Prefixes", list: prefixList },
  ];

  return prompts;
}
