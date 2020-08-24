import React from "react";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import useLocalStorage from "react-use-localstorage";
import styles from "./style.module.scss";
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
    "100"
  );

  return (
    <Modal
      style={{ zIndex: "10000" }}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ minHeight: "60vh" }}>
        <h5>Interface</h5>

        <Form>
          <Form.Group as={Row}>
            <Form.Label column xs="9" sm="10">
              Size
            </Form.Label>
            <Col xs="3" sm="2">
              <Form.Control
                value={interfaceSize}
                onChange={(e) => setInterfaceSize(e.target.value)}
                onBlur={() =>
                  (document.documentElement.style.fontSize = `${interfaceSize}%`)
                }
              />
            </Col>
          </Form.Group>

          <Form.Group style={{ alignItems: "center" }}>
            <Form.Label>File View</Form.Label>
            <ButtonGroup style={{ float: "right" }}>
              <Button
                active={fileView === "card"}
                variant="secondary"
                onClick={onCardViewClick}
              >
                Card
              </Button>
              <Button
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
