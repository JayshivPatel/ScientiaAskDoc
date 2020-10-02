import React from "react"
import Alert from "react-bootstrap/Alert"
import Button from "react-bootstrap/Button"
import Modal from "react-bootstrap/Modal"

export interface ModalProps {
  show: boolean
  onHide: any
  variant?: string
  title: string
  message: string
  confirmLabel: string
  confirmOnClick: any
}

const AlertModal: React.FC<ModalProps> = ({
  show,
  onHide,
  variant,
  title,
  message,
  confirmLabel,
  confirmOnClick,
}) => {
  return (
    <Modal show={show} onHide={onHide} style={{ zIndex: "10000" }} centered>
      <Alert
        variant={variant ? variant : "warning"}
        style={{ marginBottom: "0px" }}>
        <Alert.Heading>{title}</Alert.Heading>
        <p>{message}</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button className="mr-2" onClick={onHide} variant="outline-secondary">
            Close
          </Button>
          <Button
            onClick={confirmOnClick}
            variant={`outline-${variant ? variant : "warning"}`}>
            {confirmLabel}
          </Button>
        </div>
      </Alert>
    </Modal>
  )
}

export default AlertModal
