import React, { useState } from "react"
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
import { api } from 'constants/routes'
import { download } from 'utils/api'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FileCard from "components/cards/FileCard"
import {
  faInfoCircle,
  faFile,
  faFolder,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"
import {Feedback} from "constants/types"
import {feedbackData} from "../ModuleFeedback/feedbackData"
import SearchBox from "components/headings/SearchBox"

interface Props {
  feedbackID: number
}

const ModuleFeedback: React.FC<Props> = ({feedbackID}) => {

  const downloadFeedback = () => {
    if (feedbackID) {
      download(api.EMARKING_FEEDBACK(feedbackID, true))
    }
  }
  const [searchText, setSearchText] = useState("")


  const feedbacks = (<FileCard
              title={"Introduction to Machine Learning Coursework 1"}
              type={"CW"}
              tags={["Week 1", "New"]}
              icon={faDownload}
              thumbnail={"/images/light/banner/pdf.png"}
              onClick={downloadFeedback}
              onIconClick={downloadFeedback}
              onMouseOver={downloadFeedback}
              onMouseOut={downloadFeedback}
            />)

  return (
    <>
      <MyBreadcrumbs />
      <SearchBox
        searchText={searchText}
        onSearchTextChange={setSearchText}
        prompts={getSearchPrompts()} 
      />

      <Row style={{ marginTop: "0.625rem" }}>
        <Col style={{ paddingRight: "0.3125rem" }}>
        <Button block>
          Download All
          <FontAwesomeIcon icon={faDownload}/>
        </Button>
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
            {feedbacks}
          </Col>
        }
      </Row>
    </>
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
