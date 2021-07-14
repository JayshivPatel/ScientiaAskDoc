import React, { CSSProperties } from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";

export interface ModuleHeadingprops {
  moduleCode: string;
  subscriptionLevel: 1 | 2 | 3;
  title: string;
  style?: CSSProperties;
}

const ModuleHeading: React.FC<ModuleHeadingprops> = ({
  moduleCode,
  subscriptionLevel,
  title,
  style,
}) => {
  return (
    <Card
      // as={Link}
      // to={`modules/${moduleCode}/submissions`}
      style={style}
      className={styles.moduleCard}
    >
      <Card.Header>
        <span>{moduleCode}</span>
        <span>{`Level ${subscriptionLevel}`}</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ModuleHeading;
