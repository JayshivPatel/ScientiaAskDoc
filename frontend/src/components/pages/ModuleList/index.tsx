import React from "react";
import styles from "./style.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import classNames from "classnames";
import logicIllustration from "assets/images/logic-illustration.svg";
import discreteIllustration from "assets/images/discrete-illustration.svg";
import systemsIllustration from "assets/images/systems-illustration.svg";
import methodsIllustration from "assets/images/methods-illustration.svg";
import ModuleCard, {Term} from "components/atoms/ModuleCard";
import Dandruff from "components/molecules/Dandruff";

const ModuleList: React.FC = () => {
  let modules = [
    {
      title: "Introduction to Logic",
      code: "CO140",
			image: logicIllustration,
			terms: [Term.AUTUMN, Term.SPRING],
			progressStatus: "in progress",
			progressPercent: 50,
      content: "",
    },

    {
      title: "Discrete Mathematics",
      code: "CO142",
      image: discreteIllustration,
			terms: [Term.SPRING, Term.SUMMER],
			progressStatus: "in progress",
			progressPercent: 60,
      content: "",
    },

    {
      title: "Introduction to Computer Systems",
      code: "CO112",
      image: systemsIllustration,
			terms: [Term.SPRING],
			progressStatus: "in progress",
			progressPercent: 93,
      content: "",
    },

    {
      title: "Mathematical Methods",
			code: "CO145",
			terms: [Term.AUTUMN],
			image: methodsIllustration,
			progressStatus: "in progress",
			progressPercent: 45,
      content: "",
    },
  ];
  return (
    <Container className={classNames("p-4", styles.moduleContainer)}>
      <Dandruff heading="Modules"/>
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
          <ModuleCard module={module} key={module.code}/>
        ))}
      </Row>
    </Container>
  );
};

export default ModuleList;
