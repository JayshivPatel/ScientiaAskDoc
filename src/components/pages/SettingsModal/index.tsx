import React from "react";
import Modal from "react-bootstrap/Modal";

interface Props {
  show: boolean;
  onHide: any;
}

const SettingsModal: React.FC<Props> = ({ show, onHide }) => {
  return (
    <Modal style={{ zIndex: "10000" }} show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>Woohoo, you're reading this settings in a modal!</Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
