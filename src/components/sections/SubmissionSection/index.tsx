import React, {useEffect, useState} from "react"
import Button from "react-bootstrap/Button"
import styles from "./style.module.scss"
import {
  EnumDictionary,
  ResourceUploadRequirement,
  ResourceUploadStatus,
  TimelineEvent,
  GroupFormationMemberInfo,
  StudentInfo,
  DeclarationStatus,
  DeclarationHelper
} from "constants/types"
import ButtonGroup from "react-bootstrap/esm/ButtonGroup"
import SubmissionFileUploadTab from "../SubmissionFileUploadTab"
import { api, methods } from "constants/routes"
import { download, request } from "utils/api"
import SubmitDeclarationSection from "../SubmissionDeclarationTab";
import authenticationService from "utils/auth"
import SubmissionGroupFormation from "../SubmissionGroupFormation";
import moment from "moment";
import Accordion from "react-bootstrap/esm/Accordion"
import Card from "react-bootstrap/Card"

enum Stage {
  GROUP_FORMATION = "Group Formation",
  FILE_UPLOAD = "File Upload",
}

const allStages: Stage[] = [
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

  const [stage, setStage] = useState(Stage.FILE_UPLOAD)
  const [isLoaded, setIsLoaded] = useState(false)
  const [requirements, setRequirements] = useState<ResourceUploadRequirement[]>([])
  const [uploaded, setUploaded] = useState<ResourceUploadStatus[]>([])
  const [declarationStatus, setDeclarationStatus] = useState<DeclarationStatus>(DeclarationStatus.UNAIDED)
  const [declaredHelpers, setDeclaredHelpers] = useState<DeclarationHelper[]>([])
  const [groupID, setGroupID] = useState("")
  const [groupMembers, setGroupMembers] = useState<GroupFormationMemberInfo[]>([])
  const [availableStudents, setAvailableStudents] = useState<StudentInfo[]>([])
  const currentUser = authenticationService.getUserInfo()["username"]

  useEffect(() => {
    retrieveAvailableStudents()
  }, [])

  const retrieveAvailableStudents = () => {
    request({
      url: api.CATE_GROUP_FORMATION(courseCode, exerciseID),
      method: methods.POST,
      onSuccess: (data: { [k: string]: StudentInfo }) => {
        if (data) {
          setAvailableStudents(Object.keys(data).map((key, index) => data[key]))
        }
      },
      onError: (message: string) => console.log(`Failed to retrieve available students: ${message}`),
    })
  }

  const updateGroupMember = (method: string, body: {[k: string]: any}) => {
    request({
      url: api.CATE_GROUP_FORMATION(courseCode, exerciseID),
      method: method,
      body: body,
      onSuccess: () => {},
      onError: (message: string) => console.log(`Failed to update new team member: ${message}`),
    }).finally(() => {
      retrieveGroupInfo()
      retrieveAvailableStudents()
    })
  }

  const retrieveGroupInfo = () => {
    request({
      url: api.CATE_GROUP_FORMATION(courseCode, exerciseID),
      method: methods.GET,
      onSuccess: (data: { [k: string]: any }) => {
        if (data) {
          for (let groupID in data) {
            setGroupID(groupID)
            setGroupMembers(data[groupID].map((memberInfo: { [attr: string]: string }) => ({
              username: memberInfo.username,
              realName: `${memberInfo.lastname}, ${memberInfo.firstname}`,
              classEnrolled: memberInfo.class,
              role: memberInfo.role,
              signatureTime: memberInfo.signature === "Unsigned" ? undefined : moment(memberInfo.signature).toDate()
            })))
          }
        }
      },
      body: { username: currentUser },
      onError: (message: string) => console.log(`Failed to retrieve user information: ${message}`)
    })
  }

  useEffect(() => retrieveGroupInfo(), [])

  const addNewGroupMember = (username: string) => {
    updateGroupMember(methods.PUT, {
      "username": username,
      "groupID": groupID,
      "operation": "add"
    })
  }

  const removeGroupMember = (username: string) => {
    updateGroupMember(methods.PUT, {
      "username": username,
      "groupID": groupID,
      "operation": "delete"
    })
  }

  const addMemberSignature = (username: string) => {
    updateGroupMember(methods.PUT, {
      "username": username,
      "groupID": groupID,
      "operation": "sign"
    })
  }

  const deleteGroup = () => {
    request({
      url: api.CATE_GROUP_FORMATION(courseCode, exerciseID),
      method: methods.DELETE,
      body: {
        "groupID": groupID
      },
      onSuccess: () => {},
      onError: (message: string) => console.log(`Failed to delete new team member: ${message}`),
    }).finally(() => {
    })
  }


  const refreshRequirements = () => {
    setIsLoaded(false)
    const onError = (part: string) => () => { alert(part) }

    request({
      url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
      method: methods.GET,
      body: {
        username: authenticationService.getUserInfo()["username"]
      },
      onSuccess: (data: { requirements: ResourceUploadRequirement[] }) => {
        setRequirements(data.requirements)
        setIsLoaded(true)
      },
      onError: onError("file"),
      sendFile: false
    })

    request({
      url: api.CATE_DECLARATION(courseCode, exerciseID),
      method: methods.GET,
      body: {
        username: authenticationService.getUserInfo()["username"],
        operation: 'get'
      },
      onSuccess: (data: null | "Unaided" | { name: string, login: string }[]) => {
        if (data === null) {
          setDeclarationStatus(DeclarationStatus.UNAIDED)
          setDeclaredHelpers([])
        } else if (data === "Unaided") {
          setDeclarationStatus(DeclarationStatus.UNAIDED)
          setDeclaredHelpers([])
        } else {
          setDeclarationStatus(DeclarationStatus.WITH_HELP)
          setDeclaredHelpers(data)
        }
      },
      onError: onError("decl"),
    })
  }

  useEffect(refreshRequirements, [])
  useEffect(() => {
    if (isLoaded) console.log("refresh!")
  }, [isLoaded])

  const addDeclarationHelper = (name: string, login: string) => {
    const newHelpers = [...declaredHelpers, { name, login }]
    uploadDeclaration(newHelpers)
  }

  const removeDeclarationHelper = (targetName: string, targetLogin: string) => {
    uploadDeclaration(declaredHelpers.filter(({ name, login }) => targetName !== name || targetLogin !== login))
  }

  const uploadDeclaration = (data: "Unaided" | DeclarationHelper[]) => {
    console.log(data)
    request({
      url: api.CATE_DECLARATION(courseCode, exerciseID),
      method: methods.PUT,
      body: {
        username: authenticationService.getUserInfo()["username"],
        declaration: data
      },
      onSuccess: () => {},
      onError: () => alert("error")
    }).then(refreshRequirements)
  }


  const uploadFile = (file: File, index: number) => {
    const requirement = requirements[index]
    const suffix = file.name.substr(file.name.lastIndexOf('.') + 1)
    if (!requirement.allowedSuffixes.includes(suffix)){
      return alert("Invalid file suffix!")
    }
    if (file.size > requirement.maxSize) {
      return alert("File size exceeds max allowing size")
    }
    const title = requirement.title
    const newFile = new File([file], `${title}${suffix === "" ? "" : `.${suffix}`}`, { type: file.type })
    const newStatus: { [k: string]: any } = {
      title: title,
      suffix: suffix,
      timestamp: new Date(),
    }

    request({
      url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
      method: methods.POST,
      body: newStatus,
      onSuccess: () => {
        const formData = new FormData()
        formData.append("username", authenticationService.getUserInfo()["username"])
        formData.append("fileID", String(index))
        formData.append("file", newFile)
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
    }).finally(refreshRequirements)
  }

  const removeFile = (index: number) => {
    request({
      url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
      method: methods.DELETE,
      body: {
        fileID: index,
        username: authenticationService.getUserInfo()["username"]
      },
      onSuccess: () => {},
      onError:  () => {},
    }).finally(refreshRequirements)
  }

  const downloadFile = (url: string, filename: string, suffix: string) => {
    download(api.CATE_FILE_DOWNLOAD, `${filename}.${suffix}`, { downloadPath: url })
  }

  const mainSectionDict: EnumDictionary<Stage, JSX.Element> = {
    [Stage.GROUP_FORMATION]: (
      <SubmissionGroupFormation
          groupID={groupID}
          groupMembers={groupMembers}
          availableStudents={availableStudents}
          addNewGroupMember={addNewGroupMember}
          removeGroupMember={removeGroupMember}
          addMemberSignature={addMemberSignature}
      />
    ),
    [Stage.FILE_UPLOAD]: (
      <div>
        <SubmissionFileUploadTab
          requiredResources={requirements}
          uploadFile={uploadFile}
          removeFile={removeFile}
          downloadFile={downloadFile}
          refresh={refreshRequirements}
        />
        <hr/>
        <SubmitDeclarationSection
          status={declarationStatus}
          declaredHelpers={declaredHelpers}
          onSetUnaided={() => {
            uploadDeclaration("Unaided")
          }}
          onSetWithHelp={() => {
            uploadDeclaration([])
          }}
          addHelper={(name, login) => {
            addDeclarationHelper(name, login)
          }}
          removeHelper={removeDeclarationHelper}
        />
      </div>
    ),
  }

  const buttonOf = (s: Stage, index: number) => {
    return (
      <Button
        key={index}
        className={styles.sectionButton}
        onClick={() => setStage(s)}
        active={s === stage}
      >
        {s}
      </Button>
    )
  }

  const sectionOf = (s: Stage, index: number) => {
    return (
      <div>
        <Accordion.Toggle as={Card.Header} eventKey={`${index}`}>
          {s}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${index}`}>
          {mainSectionDict[s]}
        </Accordion.Collapse>
      </div>
    )
  }

  return (
    <Accordion defaultActiveKey="0">
      {allStages.map(sectionOf)}
    </Accordion>
  )
}

export default SubmissionSection
