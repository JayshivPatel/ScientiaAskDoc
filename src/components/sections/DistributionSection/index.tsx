import React, { useEffect, useRef, useState } from 'react'
import styles from './style.module.scss'

import { MarkingItem, EMarkingFeedbackView, StudentInfo, TimelineEvent, EMarkingDistributionView } from 'constants/types'
import { download, request, requestBlob } from 'utils/api'
import { api, methods } from 'constants/routes'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import StudentMarkingRow from 'components/rows/StudentMarkingRow'
import classNames from 'classnames'
import LoadingScreen from 'components/suspense/LoadingScreen'
import { dateToQueryYear } from 'utils/functions'
import moment from 'moment'
import auth from 'utils/auth'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface BottomButton {
  text: string,
  onClick: () => void,
  colour?: string
  disabled?: boolean,
}

enum Stage {
  LOADING = "loading",
  ERROR = "error",
  OK = "ok",
  NO_DISTRIBUTION = "noDistribution",
}

interface Props {
  event?: TimelineEvent
  courseCode: string,
  exerciseNumber: number,
}

const DistributionSection: React.FC<Props> = ({
  courseCode,
  exerciseNumber,
}) => {

  const [loading, setLoading] = useState<Stage>(Stage.LOADING)
  const [publishConfirm, setPublishConfirm] = useState<boolean>(false)
  const [distribution, setDistribution] = useState<EMarkingDistributionView>(dummyView)

  const {
    id: distributionID,
    submissions,
    feedback,
  } = distribution

  const markingItems: MarkingItem[] = 
    submissions.map(({ student_username: student, id: submissionID }) => {
      const feedbackID = feedback[
        feedback.findIndex(({ student_username }) => student_username === student)
      ]?.id
      return {
        studentName: student,
        submissionID: submissionID,
        feedbackID: feedbackID
      }
    })
    .sort((a, b) => {
      if (a.feedbackID !== undefined && b.feedbackID === undefined) {
        return 1
      } else if (a.feedbackID === undefined && b.feedbackID !== undefined) {
        return -1
      } else {
        return a.studentName.localeCompare(b.studentName)
      }
    })
  
  const isReadyToPublishFeedback = feedback.length === submissions.length

  const uploadFeedbackForStudent = (studentName: string, file: File) => {
    request<EMarkingFeedbackView>({
      api: api.EMARKING_DISTRIBUTION_FEEDBACK(distributionID),
      method: methods.POST,
      body: {
        marker: auth.getUserName(),
        student_username: studentName
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
    setLoading(Stage.LOADING)
    request<EMarkingDistributionView[]>({
      api: api.EMARKING_DISTRIBUTIONS(),
      method: methods.GET,
      body: {
        year: dateToQueryYear(moment().toDate()),
        course: Number(courseCode),
        exercise: exerciseNumber,
      }
    }).then(distributions => {
      const distribution = distributions[0]
      distribution && setDistribution(distribution)
      console.log(distributions)
      setLoading(distribution ? Stage.OK : Stage.NO_DISTRIBUTION)
    })
    .catch(error => setLoading(Stage.ERROR))
  }

  useEffect(refresh, [])

  const downloadSubmissionByID = (submissionID: number) => {
    download(api.EMARKING_SUBMISSION_FILE(submissionID), "123")
  }

  const reassign = () => {
    alert("reassign")
    // TODO:
  }

  const downloadSubmissionsZip = () => {
    const body = {
      marker: "yz31218",
    }
    download(api.EMARKING_DISTRIBUTION_SUBMISSION_ZIPPED(distributionID), "submissions.zip", body)
  }

  const downloadFeedbackByID = (feedbackID: number) => {
    download(api.EMARKING_FEEDBACK(feedbackID, true))
  }

  const deleteFeedbackByID = (feedbackID: number) => {
    request({
      api: api.EMARKING_FEEDBACK(feedbackID),
      method: methods.DELETE,
    })
    .then(refresh)
  }

  const uploadFeedbackBatch = () => {
    alert("upload feedback batch")
    // TODO:
  }

  const downloadFeedbackZip = () => {
    download(api.EMARKING_DISTRIBUTION_FEEDBACK_ZIPPED(distributionID), "feedback.zip")
  }
  
  const fetchLate = () => {
    alert("fetch late")
    // TODO: 
  }

  const publishFeedback = () => {
    alert("publish")
    // request({

    // }) 
    setPublishConfirm(false)
  }

  const hideFeedback = () => {

  }

  const makeButton = ({ text, onClick, colour, disabled }: BottomButton) => {
    return (
      <Button
        key={text}
        className={classNames(colour, styles.sectionButton)}
        onClick={onClick}
        variant="secondary" 
        disabled={disabled}
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

  const mainSection = 
    <div>
      <div className={styles.marking}>
        {markingItems.map(({ studentName, submissionID, feedbackID }) => (
          <StudentMarkingRow 
            studentName={studentName}
            submissionID={submissionID}
            feedbackID={feedbackID}
            onUploadFeedback={file => uploadFeedbackForStudent(studentName, file)}
            onDownloadSubmission={() => downloadSubmissionByID(submissionID)}
            onDownloadFeedback={() => feedbackID !== undefined && downloadFeedbackByID(feedbackID)}
            onDeleteFeedback={() => feedbackID !== undefined && deleteFeedbackByID(feedbackID)}
            onReassign={reassign}
          />
        ))}
      </div>
      <div className={styles.markingCount}>
        <span className={styles.markingCountSpan} style={{ color: isReadyToPublishFeedback ? `var(--teal-text)` : undefined }}>
          {`Marked: ${feedback.length}/${submissions.length}`}
          {isReadyToPublishFeedback && <FontAwesomeIcon icon={faCheckCircle} style={{ marginLeft: '0.2rem' }}/>}
        </span>
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
              colour: styles.green,
              disabled: !isReadyToPublishFeedback
            },
            {
              text: "Cancel and don't publish", 
              onClick: () => setPublishConfirm(false),
              colour: styles.red,
              disabled: !isReadyToPublishFeedback,
            },
          ] : 
          [
            {
              text: "Publish Feedback", 
              onClick: () => setPublishConfirm(true),
              disabled: !isReadyToPublishFeedback,
            }
          ]
      )}
    </div>

  return (
    <div style={{ position: 'relative', minHeight: '5rem' }}>
      <LoadingScreen
        isLoaded={loading !== Stage.LOADING}
        successful={mainSection}
        error={ loading === Stage.ERROR ? `Oops! The server just put me on hold!` 
              : loading === Stage.NO_DISTRIBUTION ? `Oops! Looks like you have no marking distribution on this event!` 
              : undefined}
      />
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

const dummyView: EMarkingDistributionView = {
  year: "",
  exercise: 0,
  group_id: 0,
  add_blank_page: false,
  platform: "cate",
  distributed_by: "",
  submissions: [],
  course: "",
  id: 0,
  feedback_published: false,
  feedback: [],
  timestamp: "",
  labts_path: "",
  target_files: ""
}

export default DistributionSection