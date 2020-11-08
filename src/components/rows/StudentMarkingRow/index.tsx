import { faCheckCircle, faDownload, faShare, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import IconButton from 'components/buttons/IconButton'
import IconTextButton from 'components/buttons/IconTextButton'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
import Row from 'react-bootstrap/Row'
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
          <ButtonGroup>
            <IconButton
              icon={faDownload}
              onClick={onDownloadSubmission}
              tooltip="Download this student's submission"
            />
            {feedbackID !== undefined || (
              <IconButton
                icon={faUpload}
                onClick={onUploadFeedback}
                tooltip="Upload feedback for this student"
              />
            )}
            {feedbackID !== undefined || (
              <IconButton
                icon={faShare}
                onClick={onReassign}
                tooltip="Reassign this task for this student"
              />
            )}
            {feedbackID !== undefined && (
              <div>
                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }}/>
                Uploaded!
              </div>
              
            )}
          </ButtonGroup>

        </div>
      </Row>
    </div>
  )
}

export default StudentMarkingRow