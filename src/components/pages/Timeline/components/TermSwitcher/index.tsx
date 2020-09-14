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
  style?: React.CSSProperties;
}
const TermSwitcher: React.FC<Props> = ({ term, setTerm, style }) => {
	// Only handles 3 main terms, use leftbar for holidays
  return (
    <div style={style} className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        <Button
          className={styles.termSwitch}
          active={term === "Autumn"}
          onClick={() => setTerm("Autumn")}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faLeaf} fixedWidth />
        </Button>
        <Button
          className={styles.termSwitch}
          active={term === "Spring"}
          onClick={() => setTerm("Spring")}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSeedling} fixedWidth />
        </Button>
        <Button
          className={styles.termSwitch}
          active={term === "Summer"}
          onClick={() => setTerm("Summer")}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSun} fixedWidth />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TermSwitcher;
