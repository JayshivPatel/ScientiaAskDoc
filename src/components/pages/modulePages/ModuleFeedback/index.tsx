import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"

import classNames from "classnames"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faInfoCircle } from "@fortawesome/free-solid-svg-icons"
import { Feedback } from "../../../../constants/types"
import { request } from "../../../../utils/api"
import { api, methods } from "../../../../constants/routes"

interface ModuleFeedbackProps {
  year: string
  moduleID: string
}

const ModuleFeedback: React.FC<ModuleFeedbackProps> = ({
  year,
  moduleID,
}: ModuleFeedbackProps) => {
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([])
  useEffect(() => {
    request({
      url: api.EMARKING_FEEDBACK,
      method: methods.GET,
      body: { year: year, course: moduleID },
      onSuccess: (feedback: Feedback[]) => {
        setFeedbackItems(feedback)
      },
      onError: (message) =>
        console.log(`Failed to obtain feedback ${moduleID}: ${message}`),
    })
  }, [year, moduleID])

  return (
    <>
      <MyBreadcrumbs />
      <InputGroup>
        <FormControl
          className={styles.searchBar}
          aria-label="Search"
          placeholder="Search..."
        />
        <InputGroup.Append>
          <Button className={styles.searchBarIcon}>
            <FontAwesomeIcon size="1x" icon={faInfoCircle} />
          </Button>
        </InputGroup.Append>
      </InputGroup>

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
    </>
  )
}

export default ModuleFeedback
