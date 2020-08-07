import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

export interface ModuleCardProps {
  module: {title: string;
  code: string;
  image: string;
  content: string;}
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  module
}: ModuleCardProps) => {
  return (
    <Col xs={12} md={4} style={{ marginTop: "30px" }}>
      <Card className={classNames(styles.moduleCard)}>
        <Card.Header className={classNames(styles.moduleCardHeader)}>
          {module.code}
        </Card.Header>
        <Card.Img style={{ borderRadius: 0 }} variant="top" src={module.image} />
        <Card.Body>
          <Card.Title ><Link to={`modules/${module.code}`} style={{color: "black"}}>{module.title}</Link></Card.Title>
        </Card.Body>
        <Card.Footer>
          <small className={classNames(styles.moduleCardProgressText)}>
            in progress
          </small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ModuleCard;
