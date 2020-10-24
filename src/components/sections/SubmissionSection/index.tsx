import React, {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import {EnumDictionary, ResourceUploadRequirement, ResourceUploadStatus, TimelineEvent} from "constants/types"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import SubmissionFileUpload from "../SubmissionFileUpload"
import { api, methods } from "constants/routes"
import { request } from "utils/api"
import SubmitDeclarationSection from "../SubmissionDeclarationTab";
import SubmissionGroupFormation, { UserInfo } from "../SubmissionGroupFormation";


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
  const [groupMembers, setGroupMembers] = useState<UserInfo[]>([])

  const refresh = () => {
    setIsLoaded(false)
    const onSuccess = (data: { 
      requirements: ResourceUploadRequirement[], 
    }) => {
      setRequirements(data.requirements)
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
  useEffect(() => {
    if (isLoaded) console.log("refresh!")
  }, [isLoaded])


  const uploadFile = (file: File, index: number) => {
    const requirement = requirements[index]
    const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
    console.log(suffix);

    if (requirement.allowedSuffixes.includes(suffix)) {
      const title = requirement.title
      const newFile = new File([file], `${title}${suffix === "" ? "" : `.${suffix}`}`, { type: file.type })
      const newStatus: { [k: string]: any } = {
        title: title,
        suffix: suffix,
        timestamp: new Date(),
      }
      console.log(newFile);

      request({
        url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
        method: methods.POST,
        body: newStatus,
        onSuccess: () => {
          const formData = new FormData()
          formData.append("file", file)
          request({
            url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
            method: methods.PUT,
            onSuccess: () => {},
            onError: () => {},
            body: formData,
            sendFile: true,
          })
        },
        onError: () => {},
      }).finally(refresh)
      
    } else {
      alert("u kidding?")
    }
  }

  const removeFile = (index: number) => {
    request({
      url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
      method: methods.DELETE,
      body: { fileID: index },
      onSuccess: () => {},
      onError:  () => {},
    }).finally(refresh)
  }

  const mainSectionDict: EnumDictionary<Stage, JSX.Element> = {
    [Stage.DECLARATION]: (
      <SubmitDeclarationSection/>
    ),
    [Stage.GROUP_FORMATION]: (
      <SubmissionGroupFormation
          groupMembers={groupMembers}
          onGroupMemberChange={setGroupMembers}
      />
    ),
    [Stage.FILE_UPLOAD]: (
      <SubmissionFileUpload
        requiredResources={requirements}
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

export default SubmissionSection
