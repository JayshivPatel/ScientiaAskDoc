import React, { useEffect, useState } from 'react'
import styles from './style.module.scss'
import Container from 'react-bootstrap/Container'
import { download, request } from 'utils/api'
import { dateToQueryYear } from 'utils/functions'
import { api, methods } from 'constants/routes'
import { EMarkingFeedbackMeView } from 'constants/types'
import moment from 'moment'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import LoadingScreen from 'components/suspense/LoadingScreen'
import classNames from 'classnames'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

interface Props {
  courseCode: string,
  exerciseID: number,
}

enum Stage {
  LOADING = "loading",
  OK = "ok",
  ERROR = "error",
}

const FeedbackSection: React.FC<Props> = ({
  courseCode,
  exerciseID,
}) => {

  const [feedback, setFeedback] = useState<EMarkingFeedbackMeView | undefined>()
  const [loading, setLoading] = useState<Stage>(Stage.LOADING)

  const downloadFeedback = () => {
    if (feedback) {
      download(api.EMARKING_FEEDBACK(feedback.id, true))
    }
  }

  const refresh = () => {
    setLoading(Stage.LOADING)
    request<EMarkingFeedbackMeView[]>({
      api: api.EMARKING_ME_FEEDBACK(),
      method: methods.GET,
      body: {
        year: dateToQueryYear(moment().toDate())
      }
    })
      .then(feedbacks => {
        const target = feedbacks[feedbacks.findIndex(x => x.course === courseCode && x.exercise === exerciseID)]
        setFeedback(target)
        setLoading(Stage.OK)
      })
      .catch(error => {
        setLoading(Stage.ERROR)
      })
  }

  useEffect(refresh, [])

  const { theme, title, description, icon } = feedback ? {
    theme: styles.ok,
    title: "Your feedback is released!",
    description: "Click me to view/download your feedback",
    icon: faCheckCircle,
  } : {
      theme: styles.noFeedback,
      title: "Your feedback is not ready yet :(",
      description: "We are still working around the clock. Come back later!",
      icon: faExclamation
    }

  const mainButton = (
    <Container className={classNames(styles.mainButton, theme)} onClick={downloadFeedback}>
      <FontAwesomeIcon icon={icon} style={{ fontSize: "3.5rem", marginRight: "2rem" }} />
      <div>
        <h4>{title}</h4>
        <span className={styles.description}>{description}</span>
      </div>

    </Container>
  )

  return (
    <div style={{ position: 'relative', minHeight: '5rem' }}>
      <LoadingScreen
        isLoaded={loading !== Stage.LOADING}
        successful={mainButton}
        error={loading === Stage.ERROR ? `Oops! The server just put me on hold!` : undefined}
      />
    </div>
  )
}

export default FeedbackSection