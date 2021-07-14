import React from "react";
import styles from "./style.module.scss";
import TermSwitcher from "../TermSwitcher";
import { Module, Term } from "constants/types";
import Container from "react-bootstrap/esm/Container";
import classNames from "classnames";
import ModuleHeading from "../ModuleHeading";
import MyBreadcrumbs from "components/headings/MyBreadcrumbs";
import Button from "react-bootstrap/esm/Button";

export interface Props {
  modulesList: Module[];
  activeTerm: Term;
  terms: Term[];
  setActiveTerm: React.Dispatch<React.SetStateAction<Term>>;
  openDesktopSite: () => void;
}

const TimelineMobile: React.FC<Props> = ({
  modulesList,
  activeTerm,
  setActiveTerm,
  terms,
  openDesktopSite,
}) => {
  return (
    <Container className={classNames("pageContainer")}>
      <MyBreadcrumbs />
      <TermSwitcher
        activeTerm={activeTerm}
        setActiveTerm={setActiveTerm}
        terms={terms}
        style={{ paddingLeft: "0rem", paddingRight: "0rem" }}
      />
      {modulesList.map(({ code, title, subscriptionLevel }) => (
        <ModuleHeading
          moduleCode={code}
          subscriptionLevel={subscriptionLevel}
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
