import React from "react";
import styles from "./style.module.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCandyCane,
  faEgg,
  faSeedling,
  faSun,
  faUmbrellaBeach,
} from "@fortawesome/free-solid-svg-icons";
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons";
import { Term } from "constants/types";
import ReactToolTip from "react-tooltip";

interface TermSwitcherButtonProps {
  term: Term;
  activeTerm: Term;
  setActiveTerm: React.Dispatch<React.SetStateAction<Term>>;
}

const TermSwitcherButton: React.FC<TermSwitcherButtonProps> = ({
  term,
  activeTerm,
  setActiveTerm,
}) => {
  return (
    <Button
      data-tip
      data-for={term.label}
      className={styles.termSwitch}
      active={activeTerm.label === term.label}
      onClick={() => setActiveTerm(term)}
      variant="secondary"
    >
      <FontAwesomeIcon icon={termIcons[term.label]} fixedWidth />
      <ReactToolTip id={term.label} place="top" effect="solid">
        {term.label}
      </ReactToolTip>
    </Button>
  );
};

interface Props {
  activeTerm: Term;
  setActiveTerm: React.Dispatch<React.SetStateAction<Term>>;
  terms: Term[];
  style?: React.CSSProperties;
}

const termIcons = {
  Autumn: faCanadianMapleLeaf,
  Christmas: faCandyCane,
  Spring: faSeedling,
  Easter: faEgg,
  Summer: faSun,
  "June-Sept": faUmbrellaBeach,
};

const TermSwitcher: React.FC<Props> = ({
  activeTerm,
  setActiveTerm,
  terms,
  style,
}) => {
  return (
    <div style={style} className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        {terms
          .filter((_, index) => index % 2 === 0)
          .map((term) => (
            <TermSwitcherButton
              key={term.label}
              term={term}
              activeTerm={activeTerm}
              setActiveTerm={setActiveTerm}
            />
          ))}
      </ButtonGroup>
      <ButtonGroup style={{ float: "right" }}>
        {terms
          .filter((_, index) => index % 2 !== 0)
          .map((term) => (
            <TermSwitcherButton
              key={term.label}
              term={term}
              activeTerm={activeTerm}
              setActiveTerm={setActiveTerm}
            />
          ))}
      </ButtonGroup>
    </div>
  );
};

export default TermSwitcher;
