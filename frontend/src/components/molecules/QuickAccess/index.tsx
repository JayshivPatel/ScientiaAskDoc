import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FileCard from "components/atoms/FileCard";

const QuickAccess: React.FC = () => {
  return (
    <>
      <ResourceSectionHeader heading="Quick Access"/>

      <Row
        className={classNames(
          "d-flex",
          "flex-row",
          "flex-nowrap",
          styles.quickAccessRow
        )}
      >
        {[...Array(10)].map((e, i) => (
          <Col
            xs={7}
            sm={5}
            md={5}
            lg={4}
						xl={3}
						key={i}
						style={{marginBottom: ".5rem"}}
          >
            <FileCard/>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default QuickAccess;
