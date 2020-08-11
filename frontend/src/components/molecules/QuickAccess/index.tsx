import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ResourceSectionHeader from "../ResourceSectionHeader";
import FileCard from "components/atoms/FileCard";
export interface QuickAccessProps {
  quickAccessItems: {
    title: string;
    type: string;
    tags: string[];
    id: number;
  }[];
}

const QuickAccess: React.FC<QuickAccessProps> = ({
  quickAccessItems,
}: QuickAccessProps) => {
  return (
    <>
      <ResourceSectionHeader heading="Quick Access" />

      <Row
        className={classNames(
          "d-flex",
          "flex-row",
          "flex-nowrap",
          styles.quickAccessRow
        )}
      >
        {quickAccessItems.map(({ title, type, tags, id }) => (
          <Col
            xs={7}
            sm={5}
            md={5}
            lg={4}
            xl={3}
            key={id}
            style={{ marginBottom: ".5rem" }}
          >
            <FileCard title={title} type={type} tags={tags} id={id} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default QuickAccess;
