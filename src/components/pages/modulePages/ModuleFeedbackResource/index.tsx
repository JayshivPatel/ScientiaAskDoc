import React, { useEffect, useState } from "react"
import Button from "react-bootstrap/Button"
import { Helmet } from "react-helmet"
import { faDownload } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styles from "./style.module.scss"
import { api, methods } from "constants/routes"
import { Feedback } from "constants/types"
import { downloadBlob, request } from "utils/api"
import LoadingScreen from "../../../suspense/LoadingScreen"

export interface ModuleFeedbackResourceProps {
  moduleTitle: string
  year: string
  course: string
  exercise: number
}

const ModuleFeedbackResource: React.FC<ModuleFeedbackResourceProps> = ({
  moduleTitle,
  year,
  course,
  exercise,
}) => {
  const [pdfInfo, setPdfInfo] = useState({
    filename: "",
    api_url: "",
    blob_url: "",
  })
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [error, setError] = useState<string>("")

  const openFeedback = (feedbackItems: Feedback[]) => {
    const feedback = feedbackItems.find((f) => f.exercise == exercise)
    if (feedback) {
      request({
        endpoint: api.EMARKING_FEEDBACK_FILE(feedback.id),
        method: methods.GET,
        onSuccess: (blob: Blob) => {
          setPdfInfo({
            filename: feedback.exercise_title,
            api_url: api.EMARKING_FEEDBACK_FILE(feedback.id).url,
            blob_url: URL.createObjectURL(blob),
          })
          setIsLoaded(true)
        },
        onError: (message: string) => {
          setError(message)
          setIsLoaded(true)
        },
        returnBlob: true,
      })
    }
  }

  useEffect(() => {
    if (pdfInfo.filename === "") {
      request({
        endpoint: api.EMARKING_FEEDBACK,
        method: methods.GET,
        body: {
          year: year,
          course: course,
        },
        onSuccess: openFeedback,
        onError: (message: string) => {
          setError(message)
          setIsLoaded(true)
        },
      })
    }
  }, [pdfInfo])

  const cssClass =
    window.innerWidth <= 1024 ? styles.moduleResourceMobile : styles.fileDisplay

  const view = () => {
    return (
      <div className={cssClass}>
        <Button
          onClick={() => {
            downloadBlob(pdfInfo.blob_url, pdfInfo.filename)
          }}>
          Download
          <FontAwesomeIcon icon={faDownload} />
        </Button>
        <iframe
          title="PDF"
          src={pdfInfo.blob_url}
          className={styles.pdfViewer}
        />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>
          {pdfInfo.filename} | {moduleTitle} | Scientia
        </title>
      </Helmet>
      <LoadingScreen error={error} isLoaded={isLoaded} successful={view()} />
    </>
  )
}

export default ModuleFeedbackResource
