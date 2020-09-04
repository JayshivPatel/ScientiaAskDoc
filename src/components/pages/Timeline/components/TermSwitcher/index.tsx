import React from "react";
import styles from "./style.module.scss";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSeedling, faSun } from "@fortawesome/free-solid-svg-icons";

const TermSwitcher: React.FC = () => {
  return (
    <>
				<ButtonGroup style={{ float: "right" }}>
              <Button
                className={styles.termSwitch}
                active={true}
                variant="secondary"
              >
                <FontAwesomeIcon icon={faLeaf}/>
              </Button>
							<Button
                className={styles.termSwitch}
                active={false}
                variant="secondary"
              >
                <FontAwesomeIcon icon={faSeedling}/>
              </Button>
							<Button
                className={styles.termSwitch}
                active={false}
                variant="secondary"
              >
                <FontAwesomeIcon icon={faSun}/>
              </Button>
            </ButtonGroup>
    </>
  );
};

export default TermSwitcher;
