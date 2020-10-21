import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import parentStyles from "../style.module.scss"
import styles from "./style.module.scss"
import { TimelineEvent } from "constants/types"
import Tab from "react-bootstrap/esm/Tab"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"

enum Stage {
  DECLARATION = "Declaration",
  GROUP_FORMATION = "Group Formation",
  FILE_UPLOAD = "File Upload", 
}

type EnumDictionary<T extends string | symbol | number, U> = {
  [K in T]: U;
};

const allStages: Stage[] = [
  Stage.DECLARATION,
  Stage.GROUP_FORMATION,
  Stage.FILE_UPLOAD
]

interface Props {
  event?: TimelineEvent
  activeDay: Date
}

const SubmissionSection: React.FC<Props> = ({ 
  event, 
  activeDay, 
}) => {

  const [stage, setStage] = useState<Stage>(Stage.DECLARATION)

  const mainSectionDic: EnumDictionary<Stage, JSX.Element> = {
    [Stage.DECLARATION]: <></>,
    [Stage.GROUP_FORMATION]: <></>,
    [Stage.FILE_UPLOAD]: <></>,
  }

  const buttonOf = (s: Stage) => {
    return (
      <Button
        className={styles.sectionButton}
        onClick={() => setStage(s)}
        active={s === stage}
      >
        {s}
      </Button>
    )
  }

  return (
    <>
      <div className={styles.sectionSwitcher}>
        <ButtonGroup>
          {allStages.map(buttonOf)}
        </ButtonGroup>
      </div>
      {mainSectionDic[stage]}
    </>
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

export default SubmissionSection
