import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import styles from "./style.module.scss";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { faLeaf, faSun, faSnowflake } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ModuleCardProps {
  module: { title: string; code: string; image: string; content: string };
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }: ModuleCardProps) => {
  return (
    <Col xs={12} sm={6} lg={4} xl={3} style={{ marginTop: "1.875rem" }}>
      <Card
        className={classNames(styles.moduleCard)}
        as={Link}
        to={`modules/${module.code}`}
      >
        <Card.Header>
          <div>
            <FontAwesomeIcon icon={faLeaf} style={{ marginRight: "8px" }} />
            <FontAwesomeIcon
              icon={faSnowflake}
              style={{ marginRight: "8px" }}
            />
            <FontAwesomeIcon icon={faSun} />
          </div>
          <span>{module.code}</span>
        </Card.Header>
        <Card.Img
          style={{ borderRadius: 0 }}
          variant="top"
          src={module.image}
        />
        <Card.Body>
          <Card.Title style={{ color: "#000" }}>{module.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <span className={classNames(styles.moduleCardProgressText)}>
            in progress
          </span>
          <span className={classNames(styles.moduleCardProgressText)}>60%</span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ModuleCard;
