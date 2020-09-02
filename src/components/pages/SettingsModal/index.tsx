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
  onCardViewClick: (event: React.MouseEvent) => void;
  onListViewClick: (event: React.MouseEvent) => void;
}

const SettingsModal: React.FC<Props> = ({
  show,
  onHide,
  fileView,
  onCardViewClick,
  onListViewClick,
}) => {
  const [interfaceSize, setInterfaceSize] = useLocalStorage(
    "interfaceSize",
    "90"
  );

  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <Modal
      style={{ zIndex: "10000" }}
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
      <Modal.Body style={{ minHeight: "60vh" }}>
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
                active={theme === "light"}
                onClick={() => {
                  document.documentElement.setAttribute("data-theme", "light");
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
                  document.documentElement.setAttribute("data-theme", "dark");
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
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
