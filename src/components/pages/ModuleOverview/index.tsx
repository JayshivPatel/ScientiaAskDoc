import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import styles from "./style.module.scss";

// import { request } from "../../../utils/api";
// import { api, methods } from "../../../constants/routes";

import ProgressBar from "react-bootstrap/ProgressBar";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

const ModuleOverview: React.FC = () => {
  // let { id } = useParams();
  // let moduleCode = id.startsWith("CO") ? id.slice(2) : id;

  return (
    <>
			<MyBreadcrumbs />

      <ProgressBar
				now={50}
				className={styles.progress}
      /> 
      <Accordion
        defaultActiveKey="0"
        style={{ marginTop: "1.25rem", borderRadius: ".5rem" }}
        className={styles.progressAccordion}
      >
        {[...Array(9)].map((e, i) => (
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
                Hello! I'm the body of week {i + 1}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  );
};

export default ModuleOverview;
