import React, { useEffect, useState } from "react"
import styles from "./style.module.scss"

import classNames from "classnames"
import MyBreadcrumbs from "components/headings/MyBreadcrumbs"
import Container from 'react-bootstrap/Container'

import InputGroup from "react-bootstrap/InputGroup"
import FormControl from "react-bootstrap/FormControl"
import Button from "react-bootstrap/Button"
import Badge from "react-bootstrap/Badge"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import { api, methods } from 'constants/routes'
import { download, request } from 'utils/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FileCard from "components/cards/FileCard"
import {
  faInfoCircle,
  faFile,
  faFolder,
  faDownload,
  faFilePdf,
} from "@fortawesome/free-solid-svg-icons"
import {EMarkingFeedbackMeView, Feedback} from "constants/types"
import {feedbackData} from "../ModuleFeedback/feedbackData"
import SearchBox from "components/headings/SearchBox"
import { dateToQueryYear } from "utils/functions"
import LoadingScreen from "components/suspense/LoadingScreen"

interface Props {
  courseCode: string
}

enum Stage {
  LOADING = "loading",
  OK = "ok",
  ERROR = "error",
}

const ModuleFeedback: React.FC<Props> = ({ courseCode }) => {

  const [loading, setLoading] = useState<Stage>(Stage.LOADING)
  const [feedbacks, setFeedbacks] = useState<EMarkingFeedbackMeView[]>([])

  const downloadFeedback = (feedbackID: number) => {
    download(api.EMARKING_FEEDBACK(feedbackID, true))
  }

  const refresh = () => {
    setLoading(Stage.LOADING)
    request<EMarkingFeedbackMeView[]>({
      api: api.EMARKING_ME_FEEDBACK(),
      method: methods.GET,
      body: {
        year: dateToQueryYear()
      }
    })
    .then(feedbacks => {
      console.log(feedbacks)
      setFeedbacks(feedbacks.filter(x => x.course === courseCode).sort((a, b) => a.id - b.id))
      setLoading(Stage.OK)
    })
    .catch(error => {
      setLoading(Stage.ERROR)
    })
  }

  useEffect(refresh, [])

  const [searchText, setSearchText] = useState("")

  const makeCard = (feedback: EMarkingFeedbackMeView) => {
    return (
      <Card className={styles.quickViewCard} onClick={() => downloadFeedback(feedback.id)}>
        <Card.Header>
          <span className={styles.assessmentResult}>40 / 50</span>
        </Card.Header>
        <Card.Img variant="top" src="/images/light/banner/pdf.png" />
        <Card.Body>
        <Card.Title>{feedback.exercise_title}</Card.Title>
          <FontAwesomeIcon
            style={{ fontSize: "1.125rem" }}
            icon={faFilePdf}
          />
        </Card.Body>
        <Card.Footer>
          <Badge
            pill
            className={classNames(styles.quickViewTag, styles.tagTeal)}>
            {`${feedback.course}`}
          </Badge>
          <Badge
            pill
            className={classNames(styles.quickViewTag, styles.tagBlue)}>
            {}
          </Badge>
        </Card.Footer>
      </Card>
    )
  }

  return (
    <div style={{ position: 'relative', minHeight: '5rem' }}>
      <MyBreadcrumbs />
      <LoadingScreen
        isLoaded={loading !== Stage.LOADING}
        successful={
          <>
            <SearchBox
              searchText={searchText}
              onSearchTextChange={setSearchText}
              prompts={getSearchPrompts()} 
            />

            <Row style={{ marginTop: "0.625rem" }}>
              <Col style={{ paddingRight: "0.3125rem" }}>
              {/* <Button block>
                Download All
                <FontAwesomeIcon icon={faDownload}/>
              </Button> */}
              </Col>
            </Row>

            <Row style={{ marginRight: "-0.625rem", marginLeft: "-0.625rem" }}>
              {
                <Col
                  xs={12}
                  sm={6}
                  md={6}
                  lg={4}
                  xl={3}
                  style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}>
                    {feedbacks.map(makeCard)}
                </Col>
              }
            </Row>
          </>

        }
        error={loading === Stage.ERROR ? `Oops! The server just put me on hold!` : undefined}
      />
    </div>
  )
}

function sortFeedbacks(f1: Feedback, f2: Feedback) {
  return f1.id - f2.id
}

function getSearchPrompts() {
  const prefixList = [
    { name: "TUT", value: "prefix(tut)" },
    { name: "CW", value: "prefix(cw)" },
  ]
  
  const assessmentList = [
    { name: "Assessed", value: "assessment(assessed)" },
    { name: "Unassessed", value: "assessment(unassessed)" },
    { name: "Required", value: "assessment(required)" },
    { name: "Group", value: "assessment(group)" },
    { name: "Exam", value: "assessment(exam)" },
  ]
  
  const tagsList = [
    { name: "New", value: "tag(new)" },
    { name: "Week 1", value: "tag(week 1)" },
  ]
  
  const prompts = [
    { title: "Assessment", list: assessmentList },
    { title: "Tags", list: tagsList },
    { title: "Prefixes", list: prefixList },
  ]

  return prompts
}

export default ModuleFeedback
