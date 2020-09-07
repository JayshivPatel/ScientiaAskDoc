import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./style.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import FileListItem from "components/atoms/FileListItem";
import { resourceTypeToIcon } from "components/pages/ModuleResources/utils";
import { TimelineEvent } from "constants/types";
interface Props {
  event?: TimelineEvent;
  show: boolean;
  onHide: any;
}

const EventModal: React.FC<Props> = ({ event, show, onHide }) => {
  if (!event) return null;
  return (
    <Modal
      className={styles.eventModal}
      dialogClassName={styles.modal}
      show={show}
      onHide={onHide}
      centered
    >
      <Modal.Header className={styles.modalHeader}>
        <Modal.Title>{event.prefix}</Modal.Title>
        <div style={{ display: "flex" }}>
        <Button
          variant="secondary"
					className={styles.sectionHeaderButton}
					href={`mailto:${event.owner}@ic.ac.uk?subject=Regarding ${event.title}`}
					target="_blank"
        >
          <FontAwesomeIcon className={styles.buttonIcon}  icon={faEnvelope} />
        </Button>
        <Button
          variant="secondary"
          className={styles.sectionHeaderButton}
          onClick={onHide}
        >
          <FontAwesomeIcon className={styles.buttonIcon} icon={faTimes} />
        </Button>
        </div>
      </Modal.Header>
      <Modal.Body className={styles.modalBody}>
        <span className={styles.eventTitle}>{event.title}</span>
        <div className={styles.eventInfo}>
          <span className={styles.eventAssessment}>{event.assessment}</span>
          <span className={styles.eventStatus}>{event.status}</span>
        </div>
        <div className={styles.eventTimeInfo}>
          <span className={styles.eventTime}>Issued: {event.startDate.toLocaleDateString()}</span>
          <span className={styles.eventTime}>Due: {event.endDate.toLocaleDateString()}</span>
        </div>
        <h4>Given</h4>
        {dummy.map(({ title, type, id }: any) => (
                    <FileListItem
                      title={title}
                      tags={[]}
                      icon={resourceTypeToIcon(type)}
                      onClick={() => {}}
                      key={id}
                    />
                  ))}
       </Modal.Body>
       <Modal.Footer className={styles.modalFooter}>
       <Button variant="secondary" className={styles.submitButton}>
         Submit
       </Button>
       </Modal.Footer>
    </Modal>
  );
};

const dummy = [ 
  { 
    title: "Problem Specification",
    type: "pdf",
    id: 1
  },
  { 
    title: "Model Answer",
    type: "pdf",
    id: 2
  }
]

export default EventModal;
