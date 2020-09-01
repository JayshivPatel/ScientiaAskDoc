import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styles from "./style.module.scss";

// import { request } from "../../../utils/api";
// import { api, methods } from "../../../constants/routes";

import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";
import FileListItem from "components/atoms/FileListItem";
import { resourceTypeToIcon } from "../../pages/ModuleResources";

const ModuleOverview: React.FC = () => {
  // let { id } = useParams();
  // let moduleCode = id.startsWith("CO") ? id.slice(2) : id;

  return (
    <>
      <MyBreadcrumbs />
      <Accordion
        defaultActiveKey="0"
        style={{ marginTop: "1.25rem", borderRadius: ".5rem" }}
        className={styles.progressAccordion}
      >
        {[...Array(9)].map((e, i) => {

          let WeekList = weekList.map(({ title, type, tags, id }: any) => (
            <FileListItem
              title={title}
              id={id}
              tags={tags}
              icon={resourceTypeToIcon(type)}
            />
          ));

          return (
            <Card className={styles.weekCard}>
              <Accordion.Toggle
                className={styles.weekCardHeader}
                as={Card.Header}
                eventKey={`${i}`}
              >
                Week {i + 1}
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={`${i}`}>
                <Card.Body className={styles.weekCardBody}>
                  {WeekList}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          );
        })}
      </Accordion>
    </>
  );
};

export default ModuleOverview;

let weekList = JSON.parse(
  '[{"title":"Syntax Semantics Propositional Logic","type":"pdf","tags":["Slides","new"],"folder":"Lecture Notes","id":1,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"Classical First-Order Predicate Logic","type":"pdf","tags":["Week 3","Slides","new"],"folder":"Lecture Notes","id":6,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"Translation Validity","type":"pdf","tags":["Slides","Week 3","new"],"folder":"Lecture Notes","id":8,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"validityPL-part1","type":"pdf","tags":["Slides","Week 4","new"],"folder":"Lecture Notes","id":9,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"validityPL-part2","type":"pdf","tags":["Slides","Week 4","new"],"folder":"Lecture Notes","id":10,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"validityPL-part3","type":"pdf","tags":["Slides","Week 4","new"],"folder":"Lecture Notes","id":13,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"validityFOL-part1","type":"pdf","tags":["Slides","Week 5","new"],"folder":"Lecture Notes","id":14,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"},{"title":"validityFOL-part2","type":"pdf","tags":["Slides","Week 5","new"],"folder":"Lecture Notes","id":15,"path":"140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf"}]'
);
