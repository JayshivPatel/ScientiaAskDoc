import React, { useState } from "react"
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
import {
  faInfoCircle,
  faFile,
  faFolder,
  faDownload,
} from "@fortawesome/free-solid-svg-icons"
import SearchBox from "components/headings/SearchBox"

const ModuleFeedback: React.FC = () => {
  let [searchText, setSearchText] = useState("")

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
        {[...Array(4)].map((e, i) => (
          <Col
            xs={12}
            sm={6}
            md={6}
            lg={4}
            xl={3}
            key={i}
            style={{ paddingLeft: "0.625rem", paddingRight: "0.625rem" }}>
            <Card className={styles.quickViewCard}>
              <Card.Header>
                <span className={styles.assessmentResult}>40 / 50</span>
              </Card.Header>
              <Card.Img variant="top" src="/images/light/banner/pdf.png" />
              <Card.Body>
                <Card.Title>Feedback {i}</Card.Title>
                <FontAwesomeIcon
                  style={{ fontSize: "1.125rem" }}
                  icon={faFile}
                />
              </Card.Body>
              <Card.Footer>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagTeal)}>
                  New
                </Badge>
                <Badge
                  pill
                  className={classNames(styles.quickViewTag, styles.tagBlue)}>
                  Week 1
                </Badge>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
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
