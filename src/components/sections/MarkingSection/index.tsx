import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'

import { MarkingItem, StudentInfo, TimelineEvent } from 'constants/types'
import { oldRequest } from 'utils/api'
import { api, methods } from 'constants/routes'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import StudentMarkingRow from 'components/rows/StudentMarkingRow'
import classNames from 'classnames'
import { faCheckCircle, faCross, faDownload, faEye, faShare, faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'

interface BottomButton {
  text: string,
  onClick: () => void,
  colour?: string
}

interface Props {
  event?: TimelineEvent
  courseCode: string,
  exerciseNumber: number
}

const MarkingSection: React.FC<Props> = ({

}) => {

  const [items, setItems] = useState<MarkingItem[]>([])
  const [publishConfirm, setPublishConfirm] = useState<boolean>(false)
  const [uploadFeedbackID, setUploadFeedbackID] = useState<string>("")

  const uploadRef = useRef<HTMLInputElement>(null)

  const onFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file){
      const formData = new FormData()
      formData.append("file", file)
      oldRequest({
        url: api.EMARKING_FEEDBACK(uploadFeedbackID, true).url,
        method: methods.PUT,
        body: formData,
        onSuccess: () => {},
        onError: () => {}
      }).then(refresh)
    } 
  }

  const setItemsSorted = (newItems: MarkingItem[]) => {
    newItems.sort((a, b) => {
      if (a.uploadedFeedback && !b.uploadedFeedback) {
        return -1
      } else if (!a.uploadedFeedback && b.uploadedFeedback) {
        return 1
      } else {
        return a.studentName.localeCompare(b.studentName)
      }
    })
    setItems(newItems)
  }
  
  const refresh = () => {
    setItemsSorted(dummy)
  } 

  useEffect(refresh, [])

  const downloadSubmissionByID = (submissionID: string) => {
    oldRequest({
      url: api.EMARKING_SUBMISSION_FILE(submissionID).url,
      method: methods.GET,
      onSuccess: () => {},
      onError: () => {}
    }).then(refresh)
  }

  const uploadFeedbackByID = (feedbackID: string) => {
    setUploadFeedbackID(feedbackID)
    uploadRef.current?.click()
  }

  const reassign = () => {
    // TODO:
  }

  const downloadSubmissionsZip = () => {
    // TODO: download submissions
  }

  const uploadFeedbackBatch = () => {
    // TODO:
  }
  
  const fetchLate = () => {
    // TODO: 
  }

  const publishFeedback = () => {
    // TODO: 
    setPublishConfirm(false)
  }

  const makeButton = ({ text, onClick, colour }: BottomButton) => {
    return (
      <Button
        className={classNames(colour, styles.sectionButton)}
        onClick={onClick}
      >
        {text}
      </Button>
    )
  }

  const makeBottomButtonGroup = (items: BottomButton[]) => (
    <ButtonGroup className={styles.operationButtonGroup}>
      {items.map(makeButton)}
    </ButtonGroup>
  )

  return (
    <div>
      <input type="file" ref={uploadRef} onChange={e => onFileSelection(e)} style={{ display: "none" }}></input>
      <div className={styles.marking}>
        {items.map(({ studentName, submissionID, feedbackID, uploadedFeedback }) => (
          <StudentMarkingRow 
            studentName={studentName}
            submissionID={submissionID}
            feedbackID={feedbackID}
            onDownloadSubmission={() => downloadSubmissionByID(submissionID)}
            otherButtons={
              uploadedFeedback ?
                [
                  {
                    icon: faUpload,
                    text: "Upload Feedback",
                    tooltip: "Upload feedback for this student",
                    onClick: () => uploadFeedbackByID(feedbackID),
                  },
                  {
                    icon: faShare,
                    text: "Re-assign",
                    tooltip: "Re-assign the marking task for this student to other marker",
                    onClick: () => {},
                  },
                ] :
                [
                  {
                    icon: faDownload,
                    text: "Download Feedback",
                    tooltip: "Upload feedback for this student",
                    onClick: () => uploadFeedbackByID(feedbackID),
                  },
                  {
                    icon: faTimes,
                    text: "Delete Feedback",
                    tooltip: "Delete submitted feedback",
                    warning: true,
                    onClick: () => {},
                  },
                ]
            }
          />
        ))}
      </div>
      {makeBottomButtonGroup([
        {
          text: "Download All", 
          onClick: downloadSubmissionsZip,
        },
        {
          text: "Upload feedbacks", 
          onClick: uploadFeedbackBatch
        },
        {
          text: "Fetch Late", 
          onClick: fetchLate,
        },
      ])}
      {makeBottomButtonGroup(
        publishConfirm ? 
          [
            {
              text: "Confirm and publish", 
              onClick: publishFeedback,
              colour: styles.green
            },
            {
              text: "Cancel and don't publish", 
              onClick: () => setPublishConfirm(false),
              colour: styles.red
            },
          ] : 
          [
            {
              text: "Publish Feedback", 
              onClick: () => setPublishConfirm(true),
            }
          ]
      )}
    </div>
  )
}

const dummy: MarkingItem[] = [
  {
    studentName: "John Doe",
    submissionID: "233",
    feedbackID: "6666",
    uploadedFeedback: true,
  },
  {
    studentName: "Alan Turing",
    submissionID: "250",
    feedbackID: "112233",
    uploadedFeedback: true,

  },
  {
    studentName: "Linus Torvalds",
    submissionID: "333",
    feedbackID: "223344",
    uploadedFeedback: false,

  },
  {
    studentName: "Haskell Curry",
    submissionID: "123",
    feedbackID: "334455",
    uploadedFeedback: false,

  },
  {
    studentName: "Edsger Dijkstra",
    submissionID: "114",
    feedbackID: "152242",
    uploadedFeedback: false,

  },
]

export default MarkingSection