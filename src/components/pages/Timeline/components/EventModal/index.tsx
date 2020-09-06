import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { TimelineEvent } from "../..";
interface Props {
  event?: TimelineEvent;
  show: boolean;
  onHide: any;
}

const EventModal: React.FC<Props> = ({ event, show, onHide }) => {
  return (
    <Modal
      className={styles.eventModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>{event ? event.title : "Error"}</Modal.Title>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}
        >
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}></Modal.Body>
    </Modal>
  );
};

export default EventModal;
