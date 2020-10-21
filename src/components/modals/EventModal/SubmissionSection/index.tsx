import React, { useState } from "react"
import Button from "react-bootstrap/Button"
import parentStyles from "../style.module.scss"
import styles from "./style.module.scss"
import { EnumDictionary, ResourceUploadRequirement, ResourceUploadStatus, TimelineEvent } from "constants/types"
import Tab from "react-bootstrap/esm/Tab"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import SubmissionFileUpload from "./SubmissionFileUpload"

enum Stage {
  DECLARATION = "Declaration",
  GROUP_FORMATION = "Group Formation",
  FILE_UPLOAD = "File Upload", 
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

const SubmissionSection: React.FC<Props> = ({ 
  event, 
  activeDay, 
}) => {

  const [stage, setStage] = useState<Stage>(Stage.DECLARATION)

  const mainSectionDic: EnumDictionary<Stage, JSX.Element> = {
    [Stage.DECLARATION]: <></>,
    [Stage.GROUP_FORMATION]: <></>,
    [Stage.FILE_UPLOAD]: (
      <SubmissionFileUpload
        requiredResources={dummyRUR}
        uploadedResources={dummyRUS}
      />
    ),
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

const dummyRUR: ResourceUploadRequirement[] = [
  {
    title: "foo",
    allowedSuffixes: ["pdf"]
  },
  {
    title: "report",
    allowedSuffixes: ["pdf", "txt", "pptx", "ppt"]
  },
  {
    title: "HaskellCoursework",
    allowedSuffixes: ["hs", "lhs"]
  },
  {
    title: "allow_empty_suffix",
    allowedSuffixes: ["", "txt"]
  },
]

const dummyRUS: ResourceUploadStatus[] = [
  {
    title: "bar",
    suffix: "pdf",
    size: 1024,
    timestamp: new Date()
  },
  {
    title: "KotlinCoursework",
    suffix: "kt",
    size: 2048,
    timestamp: new Date()
  },
  {
    title: "ref",
    suffix: "",
    size: 1024,
    timestamp: new Date()
  },
  
]

export default SubmissionSection
