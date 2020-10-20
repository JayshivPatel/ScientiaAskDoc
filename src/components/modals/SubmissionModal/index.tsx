import React, {useState} from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import { TimelineEvent } from "constants/types"
import Tab from "react-bootstrap/esm/Tab"
import Row from "react-bootstrap/esm/Row"
import Col from "react-bootstrap/esm/Col"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"


enum Stage {
  DECLARATION = "declaration",
  GROUP_FORMATION = "group_formation",
  FILE_UPLOAD = "file_upload", 
}

const allStages: Stage[] = [
  Stage.DECLARATION,
  Stage.GROUP_FORMATION,
  Stage.FILE_UPLOAD
]

interface Props {
  event?: TimelineEvent
  activeDay: Date
}

const SubmissionModal: React.FC<Props> = ({ 
  event, 
  activeDay, 
}) => {

  const [stage, setStage] = useState<Stage>(Stage.DECLARATION)

  const tabPaneOf = (s: Stage) => {
    return (
      <Tab.Pane active={s == stage}>
        {`placeholder of ${s}`}
      </Tab.Pane>
    )
  }

  return (
      <Tab.Container>
        <Row>
          <Col sm={3}>
            <ButtonGroup vertical>
              <Button>123</Button>
              <Button>456</Button>
              <Button>789</Button>
            </ButtonGroup>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              {allStages.map(tabPaneOf)}
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

  )

}

const dummy = [
  {
    title: "spec-112-1.pdf",
    type: "pdf",
    tags: ["Specification"],
    id: 1,
  },
  {
    title: "task1_ans.pdf",
    tags: ["Solution"],
    type: "pdf",
    id: 2,
  },
]

export default SubmissionModal
