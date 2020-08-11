import React from "react";
import styles from "./style.module.scss";

import classNames from "classnames";

import graphIllustration from "assets/images/graph-illustration.svg";
import Badge from "react-bootstrap/Badge";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile } from "@fortawesome/free-solid-svg-icons";

const FileCard: React.FC = () => {
  return (
    <Card className={styles.quickViewCard}>
      <Card.Img variant="top" src={graphIllustration} />
      <Card.Body>
        <Card.Title>Document</Card.Title>
        <FontAwesomeIcon style={{ fontSize: "1.125rem" }} icon={faFile} />
      </Card.Body>
      <Card.Footer>
        <Badge pill className={classNames(styles.quickViewTag, styles.tagTeal)}>
          New
        </Badge>
        <Badge pill className={classNames(styles.quickViewTag, styles.tagBlue)}>
          Week 1
        </Badge>
      </Card.Footer>
    </Card>
  );
};

export default FileCard;
