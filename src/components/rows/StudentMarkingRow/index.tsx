import { faCheckCircle, faCross, faDownload, faEye, faShare, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import IconButton from 'components/buttons/IconButton'
import IconTextButton from 'components/buttons/IconTextButton'
import React from 'react'
import Badge from 'react-bootstrap/Badge'
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup'
import Row from 'react-bootstrap/Row'
import OperationButtons, { ButtonDefinition } from './OperationButtons'
import styles from './style.module.scss'


interface Props {
  studentName: string,
  submissionID: string,
  feedbackID: string,
  onDownloadSubmission: () => void,
  otherButtons: ButtonDefinition[]
}

const StudentMarkingRow: React.FC<Props> = ({
  studentName,
  feedbackID,
  onDownloadSubmission,
  otherButtons,
}) => {

  return (
    <div
      className={styles.listItem}
    >
      <Row className={classNames(styles.green, styles.listRow)}>
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
          <OperationButtons actions={otherButtons} />
        </div>
      </Row>
    </div>
  )
}

export default StudentMarkingRow