import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { faSun, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export enum Term {
  AUTUMN,
  SPRING,
  SUMMER,
}
export interface ModuleCardProps {
  module: {
    title: string;
    code: string;
    image: string;
    content: string;
    terms: Term[];
    progressStatus?: string;
    progressPercent?: number;
  };
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
          <div className={styles.termIcons}>
            {module.terms.map((term: Term) => {
              switch (term) {
                case Term.AUTUMN:
                  return <FontAwesomeIcon icon={faLeaf} />;
                case Term.SPRING:
                  return <FontAwesomeIcon icon={faSeedling} />;
                case Term.SUMMER:
                  return <FontAwesomeIcon icon={faSun} />;
                default:
                  return "";
              }
            })}
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
            {module.progressStatus}
          </span>
          <span className={classNames(styles.moduleCardProgressText)}>{`${module.progressPercent}%`}</span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ModuleCard;
