import React, { CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import { Link } from "react-router-dom";
export interface ModuleHeadingprops {
  moduleCode: string;
  title: string;
  style?: CSSProperties;
}

const ModuleHeading: React.FC<ModuleHeadingprops> = ({
  moduleCode,
  title,
  style,
}) => {
  return (
    <Card
      style={style}
      className={styles.moduleCard}
      as={Link}
      to={`modules/${moduleCode}/submissions`}
    >
      <Card.Header>
        <span>{moduleCode}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ModuleHeading;
