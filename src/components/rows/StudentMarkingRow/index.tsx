import { faDownload, faEye, faShare, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames'
import React, { useRef } from 'react'
import Row from 'react-bootstrap/Row'
import OperationButtons, { ButtonDefinition } from './OperationButtons'
import styles from './style.module.scss'


interface Props {
  studentName: string,
  submissionID: number,
  feedbackID?: number,
  onUploadFeedback: (file: File) => void,
  onDownloadSubmission: () => void,
  onReassign: () => void,
}

const StudentMarkingRow: React.FC<Props> = ({
  studentName,
  feedbackID,
  onUploadFeedback,
  onDownloadSubmission,
  onReassign,
}) => {

  const onFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    file && onUploadFeedback(file)
  }

  const uploadRef = useRef<HTMLInputElement>(null)

  const otherButtons: ButtonDefinition[] = feedbackID === undefined ?
  [
    {
      icon: faUpload,
      text: "Upload Feedback",
      tooltip: "Upload feedback for this student",
      onClick: () => uploadRef.current?.click(),
    },
    {
      icon: faShare,
      text: "Re-assign",
      tooltip: "Re-assign the marking task for this student to other marker",
      onClick: () => onReassign(),
    },
  ] :
  [
    {
      icon: faDownload,
      text: "Download Feedback",
      tooltip: "Upload feedback for this student",
      onClick: () => uploadRef.current?.click(),
    },
    {
      icon: faTimes,
      text: "Delete Feedback",
      tooltip: "Delete submitted feedback",
      warning: true,
      onClick: () => {},
    },
  ]

  return (
    <div
      className={styles.listItem}
    >
      <input type="file" ref={uploadRef} onChange={e => onFileSelection(e)} style={{ display: "none" }}></input>
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