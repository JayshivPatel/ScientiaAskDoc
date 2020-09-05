import React from "react";
import styles from "./style.module.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSeedling, faSun } from "@fortawesome/free-solid-svg-icons";
import { Term } from "constants/types";

interface Props {
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
}
const TermSwitcher: React.FC<Props> = ({ term, setTerm }) => {
  return (
    <div className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        <Button
          className={styles.termSwitch}
          active={term === Term.AUTUMN}
          onClick={() => setTerm(Term.AUTUMN)}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faLeaf} fixedWidth />
        </Button>
        <Button
          className={styles.termSwitch}
          active={term === Term.SPRING}
          onClick={() => setTerm(Term.SPRING)}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSeedling} fixedWidth />
        </Button>
        <Button
          className={styles.termSwitch}
          active={term === Term.SUMMER}
          onClick={() => setTerm(Term.SUMMER)}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSun} fixedWidth />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TermSwitcher;
