import React, { useEffect, useState } from "react"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { Feedback } from "../../../../constants/types"
import { request } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"
import WarningJumbotron from "../../../suspense/WarningJumbotron"
import Dandruff from "../../../headings/Dandruff"
import LoadingScreen from "../../../suspense/LoadingScreen"
import FileCard from "../../../cards/FileCard"
import history from "../../../../history"

interface ModuleFeedbackProps {
  year: string
  moduleTitle: string
  moduleID: string
}

const navigateToFeedback = (feedback: Feedback) => {
  history.push(`/modules/${feedback.course}/feedback/${feedback.exercise}`)
}

const ModuleFeedbackResources: React.FC<ModuleFeedbackProps> = ({
  year,
  moduleTitle,
  moduleID,
}: ModuleFeedbackProps) => {
  const [isLoaded, setIsLoaded] = useState<Boolean>(false)
  const [error, setError] = useState<string>("")

  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([])
  useEffect(() => {
    request({
      endpoint: api.EMARKING_FEEDBACK,
      method: methods.GET,
      body: { year: year, course: moduleID },
      onSuccess: (feedback: Feedback[]) => {
        setFeedbackItems(feedback)
        setIsLoaded(true)
      },
      onError: (message) => {
        setError(message)
        setIsLoaded(true)
      },
    })
  }, [year, moduleID])

  const view = () => {
    if (feedbackItems.length === 0) {
      return (
        <WarningJumbotron message="No feedback has been released for this course yet." />
      )
    }
    return (
      <div style={{ paddingTop: "0.75rem" }}>
        <Row style={{ marginRight: "-0.625rem", marginLeft: "-0.625rem" }}>
          {feedbackItems
            // Show feedback from most to least recent
            .sort((f1, f2) => f2.id - f1.id)
            .map((feedback: Feedback) => (
              <Col
                xs={12}
                sm={6}
                md={6}
                lg={4}
                xl={3}
                key={feedback.id}
                style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}
              >
                <FileCard
                  title={feedback.exercise_title}
                  type={"pdf"}
                  icon={faFile}
                  onClick={() => navigateToFeedback(feedback)}
                />
              </Col>
            ))}
        </Row>
      </div>
    )
  }

  return (
    <>
      <Dandruff
        heading={moduleTitle ? `${moduleID} - ${moduleTitle}` : moduleID}
      />

      <LoadingScreen error={error} isLoaded={isLoaded} successful={view()} />
    </>
  )
}

export default ModuleFeedbackResources
