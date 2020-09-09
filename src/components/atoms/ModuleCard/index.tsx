import React from "react";
import Card from "react-bootstrap/Card";
import styles from "./style.module.scss";
import classNames from "classnames";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { faSun, faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Term, ProgressStatus, Module } from "constants/types";

export interface ModuleCardProps {
  module: Module;
}

const ModuleCard: React.FC<ModuleCardProps> = ({ module }: ModuleCardProps) => {
  let textColor: string = "";
  let moduleCode = module.code.startsWith("CO")
    ? module.code.slice(2)
    : module.code;
  moduleCode = moduleCode.split(".").join("-");
  switch (module.progressStatus) {
    case ProgressStatus.NOT_STARTED:
      textColor = "#ACB5BD";
      break;
    case ProgressStatus.IN_PROGRESS:
      textColor = "#29A745";
      break;
    case ProgressStatus.COMPLETED:
      textColor = "#000";
  }
  return (
    <Col
      xs={12}
      sm={12}
      md={6}
      lg={4}
      xl={3}
      style={{
        marginTop: "1.875rem",
        paddingLeft: "0.625rem",
        paddingRight: "0.625rem",
      }}
    >
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
                  return <FontAwesomeIcon icon={faLeaf} key={Term.AUTUMN} />;
                case Term.SPRING:
                  return (
                    <FontAwesomeIcon icon={faSeedling} key={Term.SPRING} />
                  );
                case Term.SUMMER:
                  return <FontAwesomeIcon icon={faSun} key={Term.SUMMER} />;
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
          src={`/images/${document.documentElement.getAttribute(
            "data-theme"
          )}/module/${moduleCode}.png`}
        />
        <Card.Body>
          <Card.Title>{module.title}</Card.Title>
        </Card.Body>
        <Card.Footer>
          <span
            style={{ color: textColor }}
            className={styles.moduleCardProgressText}
          >
            {module.progressStatus}
          </span>
          <span
            style={{ color: textColor }}
            className={styles.moduleCardProgressText}
          >{`${module.progressPercent}%`}</span>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default ModuleCard;
