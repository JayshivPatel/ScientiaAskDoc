import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { Feedback } from "../../../../constants/types"
import { request } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"
import WarningJumbotron from "../../../suspense/WarningJumbotron"
import Dandruff from "../../../headings/Dandruff"
import LoadingScreen from "../../../suspense/LoadingScreen"

interface ModuleFeedbackProps {
  year: string
  moduleTitle: string
  moduleID: string
}

const ModuleFeedback: React.FC<ModuleFeedbackProps> = ({
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
      <Row style={{ marginRight: "-0.625rem", marginLeft: "-0.625rem" }}>
        {feedbackItems.map((feedback: Feedback) => (
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={feedback.id}
            style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}
          >
            <Card className={styles.quickViewCard}>
              <Card.Img variant="top" src="/images/light/banner/pdf.png" />
              <Card.Body>
                <Card.Title>{feedback.exercise_title}</Card.Title>
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFile}
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
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

export default ModuleFeedback
