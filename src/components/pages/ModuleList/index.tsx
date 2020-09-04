import React from "react";
import styles from "./style.module.scss";
import Row from "react-bootstrap/Row";

import classNames from "classnames";
import logicIllustration from "assets/images/logic-illustration.svg";
import discreteIllustration from "assets/images/discrete-illustration.svg";
import systemsIllustration from "assets/images/systems-illustration.svg";
import methodsIllustration from "assets/images/methods-illustration.svg";
import graphIllustration from "assets/images/graph-illustration.svg";
import javaIllustration from "assets/images/java-illustration.png";
import reasoningIllustration from "assets/images/reasoning-illustration.png";
import architectureIllustration from "assets/images/architecture-illustration.png";
import databaseIllustration from "assets/images/database-illustration.png";

import ModuleCard, { Term, ProgressStatus } from "components/atoms/ModuleCard";
import Dandruff from "components/molecules/Dandruff";
import { modulesList } from "./list";

export interface ModuleListProps {
  modulesFilter: String;
}

const ModuleList: React.FC<ModuleListProps> = ({
  modulesFilter
}: ModuleListProps) => {
  return (
    <>
      <Dandruff heading="Modules" />
      <h4 className={classNames(styles.moduleSectionHeader)}>
        First Year Undergraduate
      </h4>
      <p className={classNames(styles.moduleParagraph)}>
        There are eight core modules, each with their own coursework and written
        examination: Introduction to Computer Systems, Introduction to Computer
        Architecture, Logic, Reasoning about Programs, Mathematics I, Discrete
        Structures, Graphs and Algorithms, Introduction to Databases.
      </p>

      <Row style={{ marginLeft: "-0.625rem", marginRight: "-0.625rem" }}>
        {modulesList
          .filter(
            ({ progressStatus }) =>
              modulesFilter === "" || progressStatus === modulesFilter
          )
          .map(module => (
            <ModuleCard module={module} key={module.code} />
          ))}
      </Row>
    </>
  );
};

export default ModuleList;