import React, {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import {EnumDictionary, ResourceUploadRequirement, ResourceUploadStatus, TimelineEvent} from "constants/types"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import SubmissionFileUpload from "../SubmissionFileUpload"
import { api, methods } from "constants/routes"
import { request } from "utils/api"
import SubmissionGroupFormation from "../SubmissionGroupFormation";
import SubmitDeclarationSection from "../SubmissionDeclarationTab";

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
  courseCode: string,
  exerciseID: number
}

const SubmissionSection: React.FC<Props> = ({
  event,
  activeDay,
  courseCode,
  exerciseID,
}) => {

  const [stage, setStage] = useState(Stage.DECLARATION)
  const [isLoaded, setIsLoaded] = useState(false)
  const [requirements, setRequirements] = useState<ResourceUploadRequirement[]>([])
  const [uploaded, setUploaded] = useState<ResourceUploadStatus[]>([])

  const refresh = () => {
    setIsLoaded(false)
    const onSuccess = (data: { 
      requirements: ResourceUploadRequirement[], 
      uploaded: ResourceUploadStatus[] 
    }) => {
      setRequirements(data.requirements)
      setUploaded(data.uploaded)
      setIsLoaded(true)
    }
    const onError = () => { alert("err") }

    request({
      url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
      method: methods.GET,
      onSuccess,
      onError
    })
  }

  useEffect(refresh, [])


  const uploadFile = (file: File, index: number) => {
    const requirement = requirements[index]
    const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
    console.log(suffix);

    if (requirement.allowedSuffixes.includes(suffix)) {
      const title = requirement.title
      const newFile = new File([file], `${title}${suffix === "" ? "" : `.${suffix}`}`, { type: file.type })
      const newStatus: ResourceUploadStatus = {
        file: newFile,
        title: title,
        suffix: suffix,
        timestamp: new Date(),
        oldRequirement: requirement
      }
      console.log(newFile);

      request({
        url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
        method: methods.POST,
        onSuccess: () => {},
        onError: () => {}
      })
      refresh()
    } else {
      alert("u kidding?")
    }
  }

  const removeFile = (index: number) => {
    const status = uploaded[index]
    setRequirements([...requirements, status.oldRequirement])
    setUploaded(uploaded.filter((_, i) => i !== index))
  }

  const mainSectionDict: EnumDictionary<Stage, JSX.Element> = {
    [Stage.DECLARATION]: (
      <SubmitDeclarationSection/>
    ),
    [Stage.GROUP_FORMATION]: (
      <SubmissionGroupFormation/>
    ),
    [Stage.FILE_UPLOAD]: (
      <SubmissionFileUpload
        requiredResources={requirements}
        uploadedResources={uploaded}
        uploadFile={uploadFile}
        removeFile={removeFile}
        refresh={refresh}
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
      {mainSectionDict[stage]}
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

export default SubmissionSection
