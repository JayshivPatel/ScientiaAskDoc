import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'

import { MarkingItem, PostFeedbackResponse, StudentInfo, TimelineEvent } from 'constants/types'
import { oldRequest, request } from 'utils/api'
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
  distributionID: number,
  exerciseNumber: number
}

const DistributionSection: React.FC<Props> = ({
  distributionID
}) => {

  const [items, setItems] = useState<MarkingItem[]>([])
  const [publishConfirm, setPublishConfirm] = useState<boolean>(false)

  const setItemsSorted = (newItems: MarkingItem[]) => {
    newItems.sort((a, b) => {
      if (a.feedbackID !== undefined && b.feedbackID === undefined) {
        return -1
      } else if (a.feedbackID === undefined && b.feedbackID !== undefined) {
        return 1
      } else {
        return a.studentName.localeCompare(b.studentName)
      }
    })
    setItems(newItems)
  }

  const uploadFeedbackForStudent = async (studentName: string, file: File) => {
    request<PostFeedbackResponse>({
      api: api.EMARKING_DISTRIBUTION_FEEDBACK(distributionID),
      method: methods.POST,
      body: {
        marker: "abc",
        student_username: "123"
      }
    })
    .then(response => {
      const formData = new FormData()
      formData.append("file", file)
      return request({
        api: api.EMARKING_FEEDBACK(response.id, true),
        method: methods.PUT,
        sendFile: true,
        body: formData
      })
    })
    .then(refresh)
    .catch(err => console.log(err))
  }
  
  const refresh = () => {
    setItemsSorted(dummy)
  } 

  useEffect(refresh, [])

  const downloadSubmissionByID = (submissionID: number) => {
    request({
      api: api.EMARKING_SUBMISSION_FILE(submissionID),
      method: methods.GET,
    })
    .then(refresh)
  }

  const reassign = () => {
    alert("reassign")
    // TODO:
  }

  const downloadSubmissionsZip = () => {
    // alert("download sub zip")
    // request({
    //   api: api.EMARKING_DISTRIBUTIONS(distributionID),
    //   method: methods.GET,
    // })
    // .then(console.log)
    // TODO: download submissions
  }

  const uploadFeedbackBatch = () => {
    alert("upload feedback batch")
    // TODO:
  }
  
  const fetchLate = () => {
    alert("fetch late")
    // TODO: 
  }

  const publishFeedback = () => {
    alert("publish")
    // TODO: 
    setPublishConfirm(false)
  }

  const hideFeedback = () => {

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
      <div className={styles.marking}>
        {items.map(({ studentName, submissionID, feedbackID }) => (
          <StudentMarkingRow 
            studentName={studentName}
            submissionID={submissionID}
            feedbackID={feedbackID}
            onUploadFeedback={file => uploadFeedbackForStudent(studentName, file)}
            onDownloadSubmission={() => downloadSubmissionByID(submissionID)}
            onReassign={reassign}
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
    submissionID: 233,
    feedbackID: 6666,
  },
  {
    studentName: "Alan Turing",
    submissionID: 250,
    feedbackID: 112233,

  },
  {
    studentName: "Linus Torvalds",
    submissionID: 333,
  },
  {
    studentName: "Haskell Curry",
    submissionID: 123,
  },
  {
    studentName: "Edsger Dijkstra",
    submissionID: 114,
  },
]

export default DistributionSection