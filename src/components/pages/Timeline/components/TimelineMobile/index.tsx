import React from "react";
import styles from "./style.module.scss";
import TermSwitcher from "../TermSwitcher";
import { Term, Module } from "constants/types";
import Container from "react-bootstrap/esm/Container";
import classNames from "classnames";
import ModuleHeading from "../ModuleHeading";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";
import Button from "react-bootstrap/esm/Button";

export interface Props {
  modulesList: Module[];
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
  openDesktopSite: () => void;
}

const TimelineMobile: React.FC<Props> = ({
  modulesList,
  term,
  setTerm,
  openDesktopSite,
}) => {
  return (
    <Container className={classNames("pageContainer")}>
      <MyBreadcrumbs />
      <TermSwitcher
        term={term}
        setTerm={setTerm}
        style={{ paddingLeft: "0rem", paddingRight: "0rem" }}
      />
      {modulesList.map(({ code, title }) => (
        <ModuleHeading
          moduleCode={code}
          key={code}
          style={{ marginTop: "1.25rem" }}
          title={title}
        />
      ))}
      <Button
        variant="secondary"
        onClick={openDesktopSite}
        className={styles.inputButton}
      >
        Desktop Site
      </Button>
    </Container>
  );
};

export default TimelineMobile;
