import React from "react";
import styles from "./style.module.scss";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import classNames from "classnames";
import logicIllustration from "assets/images/logic-illustration.svg";
import discreteIllustration from "assets/images/discrete-illustration.svg";
import systemsIllustration from "assets/images/systems-illustration.svg";
import methodsIllustration from "assets/images/methods-illustration.svg";
import ModuleCard from "components/atoms/ModuleCard";

const ModuleList: React.FC = () => {
  let modules = [
    {
      title: "Introduction to Logic",
      code: "CO140",
      image: logicIllustration,
      content: "",
    },

    {
      title: "Discrete Mathematics",
      code: "CO142",
      image: discreteIllustration,
      content: "",
    },

    {
      title: "Mathematical Methods",
      code: "CO112",
      image: systemsIllustration,
      content: "",
    },

    {
      title: "Introduction to Logic",
      code: "CO145",
      image: methodsIllustration,
      content: "",
    },
  ];
  return (
    <Container className={classNames("p-4", styles.moduleContainer)}>
      <Breadcrumb className={classNames(styles.breadcrumb)}>
        <Breadcrumb.Item active>Modules</Breadcrumb.Item>
        <Breadcrumb.Item></Breadcrumb.Item>
      </Breadcrumb>

      <h3 className={classNames(styles.moduleHeader)}>Modules</h3>
      <hr />
      <h4 className={classNames(styles.moduleSectionHeader)}>
        First Year Undergraduate
      </h4>
      <p className={classNames(styles.moduleParagraph)}>
        There are eight core modules, each with their own coursework and written
        examination: Introduction to Computer Systems, Introduction to Computer
        Architecture, Logic, Reasoning about Programs, Mathematics I, Discrete
        Structures, Graphs and Algorithms, Introduction to Databases.
      </p>

      <Row>
        {modules.map((module) => (
          <ModuleCard module={module} />
        ))}
      </Row>
    </Container>
  );
};

export default ModuleList;
