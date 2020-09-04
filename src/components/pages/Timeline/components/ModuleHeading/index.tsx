import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";

export interface ModuleHeadingprops {
  moduleCode: string;
  title: string;
}

const ModuleHeading: React.FC<ModuleHeadingprops> = ({ moduleCode, title }) => {
  return (
    <Card className={styles.moduleCard}>
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
