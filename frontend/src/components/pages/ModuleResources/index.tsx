import React from "react";
import styles from "./style.module.scss";
import Container from "react-bootstrap/Container";

import classNames from "classnames";
import Dandruff from "components/molecules/Dandruff";

const ModuleResources: React.FC = () => {
  return (
    <Container className={classNames("p-4", styles.moduleContainer)}>
      <Dandruff heading="Resources"/>
    </Container>
  );
};

export default ModuleResources;
