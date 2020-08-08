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
    <Col xs={12} sm={6} lg={4} xl={3} style={{ marginTop: "1.875rem" }}>
      <Card className={classNames(styles.moduleCard)}>
        <Link style={{ textDecoration: "none" }} to={`modules/${module.code}`}>
        <Card.Header className={classNames(styles.moduleCardHeader)}>
          {module.code}
        </Card.Header>
        <Card.Img style={{ borderRadius: 0 }} variant="top" src={module.image} />
        <Card.Body>
          <Card.Title style={{ color: "#000" }}>{module.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <small className={classNames(styles.moduleCardProgressText)}>
            in progress
          </small>
        </Card.Footer>
          </Link>
      </Card>
    </Col>
  );
};

export default ModuleCard;
