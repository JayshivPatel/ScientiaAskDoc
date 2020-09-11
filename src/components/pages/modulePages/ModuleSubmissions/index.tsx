import React, { useState } from "react";
import { TimelineEvent } from "constants/types";
import { eventsData } from "../../Timeline/eventsData";
import Row from "react-bootstrap/esm/Row";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";
import ModuleEventCard from "components/cards/ModuleEventCard";
import Col from "react-bootstrap/esm/Col";
import SearchBox from "components/headings/SearchBox";

interface Props {
  moduleID: string;
  onEventClick: (e: TimelineEvent) => void;
}
const ModuleSubmissions: React.FC<Props> = ({ moduleID, onEventClick }) => {
  let [searchText, setSearchText] = useState("");

  const activeDay = new Date("2020-10-21");
  return (
    <>
      <MyBreadcrumbs />
      <SearchBox
        searchText={searchText}
        onSearchTextChange={setSearchText}
        prompts={getSearchPrompts()}
      />
      <Row
        style={{
          marginTop: "1.25rem",
          marginLeft: "-0.625rem",
          marginRight: "-0.625rem",
        }}
      >
        {eventsData
          .filter(({ moduleCode }) => moduleCode === moduleID)
          .filter((e) => includeInSearchResult(e, searchText))
          .sort((e1, e2) => sortEvents(e1, e2))
          .map((e) => (
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              xl={4}
              key={e.id}
              onClick={() => onEventClick(e)}
              style={{
                marginTop: "1.25rem",
                paddingLeft: "0.625rem",
                paddingRight: "0.625rem",
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

function sortEvents(e1: TimelineEvent, e2: TimelineEvent) {
  function getIndex(event: TimelineEvent) {
    const statusOrder = ["late", "due", "unreleased", "complete", "missed"];
    return statusOrder.indexOf(event.status);
  }

  if (getIndex(e1) !== getIndex(e2)) {
    return getIndex(e1) - getIndex(e2);
  }
  if (e1.startDate.getTime() !== e2.startDate.getTime()) {
    return e1.startDate.getTime() - e2.startDate.getTime();
  }
  return e2.endDate.getTime() - e1.endDate.getTime();
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
