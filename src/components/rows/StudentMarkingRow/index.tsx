import { faCheckCircle, faCross, faDownload, faEye, faShare, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import IconButton from 'components/buttons/IconButton'
import IconTextButton from 'components/buttons/IconTextButton'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
import Row from 'react-bootstrap/Row'
import OperationButtons from './OperationButtons'
import styles from './style.module.scss'


interface Props {
  studentName: string,
  submissionID: string,
  feedbackID?: string,
  onDownloadSubmission: () => void,
  onUploadFeedback?: () => void,
  onReassign: () => void,
}

const StudentMarkingRow: React.FC<Props> = ({
  studentName,
  feedbackID,
  onDownloadSubmission,
  onUploadFeedback,
  onReassign,
}) => {

  return (
    <div
      className={styles.listItem}
    >
      <Row className={styles.listRow}>
        <div className={styles.listItemTitle}>
          <div style={{ verticalAlign: 'center' }}>
            {studentName}
          </div>
        </div>
        <div className={styles.centeredFlex}>
          <OperationButtons
            actions={[
              {
                icon: faEye,
                text: "View Submission",
                tooltip: "View Submission of this student",
                onClick: onDownloadSubmission,
              }
            ]}
          />
          {feedbackID !== undefined || <OperationButtons
            actions={[
              {
                icon: faUpload,
                text: "Upload Feedback",
                tooltip: "Upload feedback for this student",
                onClick: onUploadFeedback,
              },
              {
                icon: faShare,
                text: "Re-assign",
                tooltip: "Re-assign the marking task for this student to other marker",
                onClick: onUploadFeedback,
              },
            ]}
          />}    
          {feedbackID !== undefined && <OperationButtons
            actions={[
              {
                icon: faDownload,
                text: "Download Feedback",
                tooltip: "Download feedback of this student",
                onClick: onUploadFeedback,
              },
              {
                icon: faTimes,
                text: "Delete",
                tooltip: "Delete Feedback of this student",
                onClick: onUploadFeedback,
                warning: true,
              },
            ]}
          />}
        </div>
      </Row>
    </div>
  )
}

export default StudentMarkingRow