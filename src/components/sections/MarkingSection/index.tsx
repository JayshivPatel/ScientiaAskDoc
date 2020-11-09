import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'

import { MarkingItem, StudentInfo, TimelineEvent } from 'constants/types'
import { request } from 'utils/api'
import { api, methods } from 'constants/routes'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import StudentMarkingRow from 'components/rows/StudentMarkingRow'


interface Props {
  event?: TimelineEvent
  courseCode: string,
  exerciseNumber: number
}

const MarkingSection: React.FC<Props> = ({

}) => {

  const [items, setItems] = useState<MarkingItem[]>([])

  useEffect(() => setItemsSorted(dummy), [])

  const setItemsSorted = (newItems: MarkingItem[]) => {
    newItems.sort((a, b) => {
      const aFeedback = a.feedbackID !== undefined
      const bFeedback = b.feedbackID !== undefined
      if (!aFeedback && bFeedback) {
        return -1
      } else if (aFeedback && !bFeedback) {
        return 1
      } else {
        return a.studentName.localeCompare(b.studentName)
      }
    })
    setItems(newItems)
  }
  

  const downloadSubmissionByID = (submissionID: string) => {
    request({
      url: api.EMARKING_SUBMISSION_FILE(submissionID),
      method: methods.GET,
      onSuccess: () => {},
      onError: () => {}
    })
  }

  const downloadSubmissionsZip = () => {
    // TODO: download submissions
  }
  
  const fetchLate = () => {
    // TODO: download submissions
  }
  

  const buttons = ((items: [string, () => void][]) => {
    return items.map(([text, onClick]) => (
      <Button
        className={styles.sectionButton}
        onClick={onClick}
      >
        {text}
      </Button>
    ))
  })([
    ["Download Submissions", downloadSubmissionsZip],
    ["Fetch late", fetchLate],
  ])


  return (
    <div>
      <div className={styles.marking}>
        {items.map(({ studentName, submissionID, feedbackID }) => (
          <StudentMarkingRow 
            studentName={studentName}
            submissionID={submissionID}
            feedbackID={feedbackID}
            onDownloadSubmission={() => {}}
            onReassign={() => {}}
          />
        ))}
      </div>
      <ButtonGroup className={styles.operationButtonGroup}>
        {buttons}
      </ButtonGroup>
    </div>
  )
}

const dummy: MarkingItem[] = [
  {
    studentName: "John Doe",
    submissionID: "233",
    feedbackID: "6666",
  },
  {
    studentName: "Alan Turing",
    submissionID: "250",
    feedbackID: "112233",
  },
  {
    studentName: "Linus Torvalds",
    submissionID: "333",
  },
  {
    studentName: "Haskell Curry",
    submissionID: "123",
  },
  {
    studentName: "Edsger Dijkstra",
    submissionID: "114",
    feedbackID: "152242",
  },
]

export default MarkingSection