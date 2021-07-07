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
import { OldTerm } from "constants/types";
import ReactToolTip from "react-tooltip";

interface Props {
  term: OldTerm;
  setTerm: React.Dispatch<React.SetStateAction<OldTerm>>;
  style?: React.CSSProperties;
}
const TermSwitcher: React.FC<Props> = ({ term, setTerm, style }) => {
  // Only handles 3 main terms, use leftbar for holidays
  return (
    <div style={style} className={styles.timelineTermSwitcher}>
      <ButtonGroup style={{ float: "right" }}>
        <Button
          data-tip
          data-for="Autumn"
          className={styles.termSwitch}
          active={term === "Autumn"}
          onClick={() => setTerm("Autumn")}
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
          active={term === "Spring"}
          onClick={() => setTerm("Spring")}
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
          active={term === "Summer"}
          onClick={() => setTerm("Summer")}
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
          active={term === "Christmas"}
          onClick={() => setTerm("Christmas")}
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
          active={term === "Easter"}
          onClick={() => setTerm("Easter")}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faEgg} fixedWidth />
          <ReactToolTip id="Easter" place="bottom" effect="solid">
            Easter
          </ReactToolTip>
        </Button>
        <Button
          data-tip
          data-for="Jun-Sept"
          className={styles.termSwitch}
          active={term === "Jun-Sept"}
          onClick={() => setTerm("Jun-Sept")}
          variant="secondary"
        >
          <FontAwesomeIcon icon={faUmbrellaBeach} fixedWidth />
          <ReactToolTip id="Jun-Sept" place="bottom" effect="solid">
            Jun-Sept
          </ReactToolTip>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default TermSwitcher;
