import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";

import graphIllustration from "assets/images/graph-illustration.svg";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFile,
} from "@fortawesome/free-solid-svg-icons";
import ResourceSectionHeader from "../ResourceSectionHeader";

const QuickAccess: React.FC = () => {
  return (
    <>
      <ResourceSectionHeader/>

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
            <Card className={styles.quickViewCard}>
              <Card.Img variant="top" src={graphIllustration} />
              <Card.Body>
                <Card.Title>Document {i}</Card.Title>
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFile}
                />
              </Card.Body>
              <Card.Footer>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagTeal)}
                >
                  New
                </Badge>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagBlue)}
                >
                  Week 1
                </Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default QuickAccess;
