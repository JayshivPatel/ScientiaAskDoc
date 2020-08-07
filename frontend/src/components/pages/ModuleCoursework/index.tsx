import React from "react";
import styles from "./style.module.scss";
import Container from "react-bootstrap/Container";

import classNames from "classnames";
import Dandruff from "components/molecules/Dandruff";

const ModuleCoursework: React.FC = () => {
  return (
    <Container className={classNames("p-4", styles.moduleContainer)}>
      <Dandruff heading="Coursework"/>
    </Container>
  );
};

export default ModuleCoursework;
