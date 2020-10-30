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
import LoadingScreen from "components/suspense/LoadingScreen"

enum Stage {
  GROUP_FORMATION = "Group Formation",
  FILE_UPLOAD = "File Upload",
}

enum LoadingParts {
  DECLARATION = 'Declaration',
  GROUP_INFO = 'Group Info',
  AVAILABLE_STUDENTS = 'Available Students',
  FILE_STATUS = 'File Status',
}

const groupParts = [
  LoadingParts.GROUP_INFO,
  LoadingParts.AVAILABLE_STUDENTS
]

const essentialParts = [
  LoadingParts.FILE_STATUS,
  LoadingParts.DECLARATION
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
  const allStages: Stage[] = event?.assessment === "group" ?
    [ Stage.FILE_UPLOAD, Stage.GROUP_FORMATION ] : [ Stage.FILE_UPLOAD ];
  const allParts: LoadingParts[] =
    event?.assessment === "group" 
      ? [...groupParts, ...essentialParts] 
      : essentialParts
  
  const [loadingParts, setLoadingParts] = useState<Set<LoadingParts>>(new Set())
  const [loadErrorParts, setLoadErrorParts] = useState<Set<LoadingParts>>(new Set())
  const [requirements, setRequirements] = useState<ResourceUploadRequirement[]>([])
  const [declarationStatus, setDeclarationStatus] = useState<DeclarationStatus>(DeclarationStatus.UNAIDED)
  const [declaredHelpers, setDeclaredHelpers] = useState<DeclarationHelper[]>([])
  const [groupID, setGroupID] = useState("")
  const [groupMembers, setGroupMembers] = useState<GroupFormationMemberInfo[]>([])
  const [availableStudents, setAvailableStudents] = useState<StudentInfo[]>([])
  const[activeStage, setActiveStage] = useState(event?.assessment === "group" ? "1" : "0")
  const currentUser = authenticationService.getUserInfo()["username"]

  const loaded = (part: LoadingParts) => {
    setLoadingParts(loadingParts => {
      loadingParts.delete(part)
      return new Set(loadingParts)
    })
  }

  const loadError = (part: LoadingParts) => {
    setLoadingParts(loadingParts => {
      console.log("Failed to retrieve part: ", part)
      loadingParts.delete(part)
      return new Set([...loadingParts])
    })
    setLoadErrorParts(loadErrorParts => new Set([...loadErrorParts, part]))
  }

  const isLoaded = loadingParts.size === 0
  const isLoadError = loadErrorParts.size > 0

  /* ================================ Group Formation ================================ */
  const retrieveAvailableStudents = async () => {
    request({
      url: api.CATE_AVAILABLE_STUDENTS_FOR_EXERCISE(courseCode, exerciseID),
      method: methods.GET,
      onSuccess: (data: { [k: string]: StudentInfo }) => {
        if (data) {
          setAvailableStudents(Object.keys(data).map((key, _) => data[key]))
        }
        loaded(LoadingParts.AVAILABLE_STUDENTS)
      },
      onError: () => loadError(LoadingParts.AVAILABLE_STUDENTS),
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

  const retrieveGroupInfo = async () => {
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
        } else {
          setGroupID("")
          setGroupMembers([])
        }
        loaded(LoadingParts.GROUP_INFO)
      },
      body: { username: currentUser },
      onError: () => loadError(LoadingParts.GROUP_INFO)
    })
  }

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
  const createGroup = () => {
    request({
      url: api.CATE_GROUP_FORMATION(courseCode, exerciseID),
      method: methods.POST,
      body: {
        "username": currentUser
      },
      onSuccess: () => {},
      onError: (message: string) => console.log(`Failed to create a new group: ${message}`),
    }).finally(() => {
      retrieveGroupInfo()
      retrieveAvailableStudents()
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
      onError: (message: string) => console.log(`Failed to delete group ${groupID}: ${message}`),
    }).finally(() => {
      retrieveGroupInfo()
      retrieveAvailableStudents()
    })
  }

  /* ================================ File Submission ================================ */
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
    }).finally(refreshAllParts)
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
    }).finally(refreshAllParts)
  }

  const downloadFile = (url: string, filename: string, suffix: string) => {
    download(api.CATE_FILE_DOWNLOAD, `${filename}.${suffix}`, { downloadPath: url })
  }

  const retrieveFileStatus = async () => request({
    url: api.CATE_FILE_UPLOAD(courseCode, exerciseID),
    method: methods.GET,
    body: {
      username: authenticationService.getUserInfo()["username"]
    },
    onSuccess: (data: { requirements: ResourceUploadRequirement[] }) => {
      setRequirements(data.requirements)
      loaded(LoadingParts.FILE_STATUS)
    },
    onError: () => loadError(LoadingParts.FILE_STATUS),
    sendFile: false
  })


  /* ================================ Declaration ================================ */
  const addDeclarationHelper = (name: string, login: string) => {
    const newHelpers = [...declaredHelpers, { name, login }]
    uploadDeclaration(newHelpers)
  }

  const removeDeclarationHelper = (targetName: string, targetLogin: string) => {
    uploadDeclaration(declaredHelpers.filter(({ name, login }) => targetName !== name || targetLogin !== login))
  }

  const uploadDeclaration = (data: "Unaided" | DeclarationHelper[]) => {
    request({
      url: api.CATE_DECLARATION(courseCode, exerciseID),
      method: methods.PUT,
      body: {
        username: authenticationService.getUserInfo()["username"],
        declaration: data
      },
      onSuccess: () => {},
      onError: () => alert("error")
    }).then(refreshAllParts)
  }

  const retrieveDeclaration = async () => request({
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
      loaded(LoadingParts.DECLARATION)
    },
    onError: () => loadError(LoadingParts.DECLARATION),
  })


  /* ================================ Refresh ================================ */
  const refreshAllParts = () => {
    setLoadingParts(new Set(allParts))

    const actionDic: EnumDictionary<LoadingParts, () => Promise<void>> = {
      [LoadingParts.GROUP_INFO]: retrieveGroupInfo,
      [LoadingParts.AVAILABLE_STUDENTS]: retrieveAvailableStudents,
      [LoadingParts.FILE_STATUS]: retrieveFileStatus,
      [LoadingParts.DECLARATION]: retrieveDeclaration,
    }

    Promise.all(allParts.map(part => actionDic[part]()))
  }

  useEffect(refreshAllParts, [])
  
  // Programmatically open the group formation tab
  const openGroupFormationTab = (event: React.MouseEvent) => setActiveStage("1")

  const mainSectionDict: EnumDictionary<Stage, JSX.Element> = {
    [Stage.GROUP_FORMATION]: (
      <SubmissionGroupFormation
          groupID={groupID}
          groupMembers={groupMembers}
          availableStudents={availableStudents}
          addNewGroupMember={addNewGroupMember}
          removeGroupMember={removeGroupMember}
          addMemberSignature={addMemberSignature}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
      />
    ),
    [Stage.FILE_UPLOAD]: (
      <div>
        <SubmissionFileUploadTab
          displayFileUpload={(event?.assessment === "group" && groupID !== "") || event?.assessment !== "group"}
          requiredResources={requirements}
          uploadFile={uploadFile}
          removeFile={removeFile}
          downloadFile={downloadFile}
          refresh={refreshAllParts}
          onWarningSectionClick={openGroupFormationTab}
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

  const sectionOf = (s: Stage, index: number) => {
    return (
      <div>
        <Accordion.Toggle
          onClick={() => setActiveStage(`${index}`)}
          as={Card.Header}
          className={styles.accordionTab}
          eventKey={`${index}`}>
          {s}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={`${index}`} className={styles.collapse}>
          {mainSectionDict[s]}
        </Accordion.Collapse>
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', minHeight: '5rem' }}>
      <LoadingScreen
        isLoaded={isLoaded}
        successful={
          <Accordion activeKey={activeStage}>
            {allStages.map(sectionOf)}
          </Accordion>
        }
        error={isLoadError ? `Oops! The server just put me on hold!` : undefined}
      />
    </div>

  )
}

export default SubmissionSection
