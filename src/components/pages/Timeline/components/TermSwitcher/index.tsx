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

interface Props {
  term: Term;
  setTerm: React.Dispatch<React.SetStateAction<Term>>;
  terms: Term[];
  style?: React.CSSProperties;
}

const TermSwitcher: React.FC<Props> = ({ term, setTerm, terms, style }) => {
  // Only handles 3 main terms, use leftbar for holidays
  return (
    <div style={style} className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        <Button
          data-tip
          data-for="Autumn"
          className={styles.termSwitch}
          active={term.label === "Autumn"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "Autumn") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faCanadianMapleLeaf} fixedWidth />
          <ReactToolTip id="Autumn" place="top" effect="solid">
            Autumn
          </ReactToolTip>
        </Button>

        <Button
          data-tip
          data-for="Spring"
          className={styles.termSwitch}
          active={term.label === "Spring"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "Spring") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSeedling} fixedWidth />
          <ReactToolTip id="Spring" place="top" effect="solid">
            Spring
          </ReactToolTip>
        </Button>
        <Button
          data-tip
          data-for="Summer"
          className={styles.termSwitch}
          active={term.label === "Summer"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "Summer") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faSun} fixedWidth />
          <ReactToolTip id="Summer" place="top" effect="solid">
            Summer
          </ReactToolTip>
        </Button>
      </ButtonGroup>
      <ButtonGroup style={{ float: "right" }}>
        <Button
          data-tip
          data-for="Christmas"
          className={styles.termSwitch}
          active={term.label === "Christmas"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "Christmas") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faCandyCane} fixedWidth />
          <ReactToolTip id="Christmas" place="bottom" effect="solid">
            Christmas
          </ReactToolTip>
        </Button>
        <Button
          data-tip
          data-for="Easter"
          className={styles.termSwitch}
          active={term.label === "Easter"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "Easter") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faEgg} fixedWidth />
          <ReactToolTip id="Easter" place="bottom" effect="solid">
            Easter
          </ReactToolTip>
        </Button>
        <Button
          data-tip
          data-for="June-Sept"
          className={styles.termSwitch}
          active={term.label === "June-Sept"}
          onClick={() => {
            setTerm(terms.find((t) => t.label === "June-Sept") as Term);
          }}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faUmbrellaBeach} fixedWidth />
          <ReactToolTip id="June-Sept" place="bottom" effect="solid">
            June-Sept
          </ReactToolTip>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TermSwitcher;
