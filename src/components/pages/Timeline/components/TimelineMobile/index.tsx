import React from "react";
import styles from "./style.module.scss";
import TermSwitcher from "../TermSwitcher";
import { Term, Module } from "constants/types";
import Container from "react-bootstrap/esm/Container";
import classNames from "classnames";
import ModuleHeading from "../ModuleHeading";
import MyBreadcrumbs from "components/atoms/MyBreadcrumbs";

export interface Props {
  modulesList: Module[];
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}

const TimelineMobile: React.FC<Props> = ({ modulesList, term, setTerm }) => {
  return (
    <Container className={classNames("pageContainer")}>
			<MyBreadcrumbs/>
      <TermSwitcher term={term} setTerm={setTerm} />
      {modulesList.map(({ code, title }) => (
        <ModuleHeading
          moduleCode={code}
          key={code}
          style={{ marginTop: "1.25rem" }}
          title={title}
        />
      ))}
    </Container>
  );
};

export default TimelineMobile;
