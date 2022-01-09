import React from "react"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { faFile } from "@fortawesome/free-solid-svg-icons"
import WarningJumbotron from "../../../../suspense/WarningJumbotron"
import { Feedback } from "../../../../../constants/types"
import FileCard from "../../../../cards/FileCard"

interface FileCardsViewProps {
  feedbackItems: Feedback[]
}

const navigateToFeedback = (feedback: Feedback) => {
  const feedback_path =
    window.location.origin +
    `/${feedback.year}/modules/${feedback.course}/feedback/${feedback.exercise}`
  window.open(feedback_path, "_blank")
}

const FileCardsView: React.FC<FileCardsViewProps> = ({
  feedbackItems,
}: FileCardsViewProps) => {
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
              style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}>
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
export default FileCardsView
