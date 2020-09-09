import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import useLocalStorage from "react-use-localstorage";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
interface Props {
  show: boolean;
  onHide: any;
  fileView: string;
  setDarkTheme: (toSet: boolean) => any;
  onCardViewClick: (event: React.MouseEvent) => void;
  onListViewClick: (event: React.MouseEvent) => void;
  year: string;
  setYear: Function;
}

const SettingsModal: React.FC<Props> = ({
  show,
  onHide,
  fileView,
  setDarkTheme,
  onCardViewClick,
  onListViewClick,
  year,
  setYear,
}) => {
  const [interfaceSize, setInterfaceSize] = useLocalStorage(
    "interfaceSize",
    "90"
  );

  const [theme, setTheme] = useLocalStorage("theme", "default");

  return (
    <Modal
      className={styles.settingsModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>Settings</Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}
        >
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <h5 className={styles.modalSubHeading}>Interface</h5>

        <Form className={styles.interfaceGroup}>
          <Form.Group as={Row}>
            <Form.Label column xs="9" sm="10">
              Size
            </Form.Label>
            <Col xs="3" sm="2">
              <Form.Control
                className={styles.inputBar}
                value={interfaceSize}
                onChange={(e) => setInterfaceSize(e.target.value)}
                onBlur={() =>
                  (document.documentElement.style.fontSize = `${interfaceSize}%`)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group style={{ alignItems: "center" }}>
            <Form.Label>Theme</Form.Label>
            <ButtonGroup style={{ float: "right" }}>
              <Button
                className={styles.modalToggleButton}
                active={theme === "default"}
                onClick={() => {
                  let mq = window.matchMedia("(prefers-color-scheme: dark)");
                  mq.addListener((mq) => setDarkTheme(mq.matches));
                  setDarkTheme(mq.matches);
                  setTheme("default");
                }}
                variant="secondary"
              >
                Default
              </Button>
              <Button
                className={styles.modalToggleButton}
                active={theme === "light"}
                onClick={() => {
                  setDarkTheme(false);
                  setTheme("light");
                }}
                variant="secondary"
              >
                Light
              </Button>
              <Button
                className={styles.modalToggleButton}
                active={theme === "dark"}
                onClick={() => {
                  setDarkTheme(true);
                  setTheme("dark");
                }}
                variant="secondary"
              >
                Dark
              </Button>
            </ButtonGroup>
          </Form.Group>

          <Form.Group style={{ alignItems: "center" }}>
            <Form.Label>File View</Form.Label>
            <ButtonGroup style={{ float: "right" }}>
              <Button
                className={styles.modalToggleButton}
                active={fileView === "card"}
                variant="secondary"
                onClick={onCardViewClick}
              >
                Card
              </Button>
              <Button
                className={styles.modalToggleButton}
                active={fileView === "list"}
                variant="secondary"
                onClick={onListViewClick}
              >
                List
              </Button>
            </ButtonGroup>
          </Form.Group>
        </Form>

        <h5 style={{ marginTop: "1.25rem" }} className={styles.modalSubHeading}>
          Data
        </h5>

        <Form className={styles.interfaceGroup}>
          <Form.Group style={{ alignItems: "center" }} as={Row}>
            <Form.Label column xs="8" sm="8" lg="9">
              Year
            </Form.Label>
            <Col xs="4" sm="4" lg="3">
              <Form.Control
                as="select"
                onChange={(e) => {
                  setYear(e.target.value);
								}}
								value={year}
              >
                <option value="2021">2020 - 2021</option>
                <option value="1920">2019 - 2020</option>
                <option value="1819">2018 - 2019</option>
                <option value="1718">2017 - 2018</option>
              </Form.Control>
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
