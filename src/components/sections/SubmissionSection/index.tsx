import React, {useEffect, useState} from "react"
import styles from "./style.module.scss"
import {
  DeclarationHelper,
  DeclarationInfo,
  DeclarationStatus,
  EnumDictionary,
  GroupFormationMemberInfo,
  ResourceUploadRequirement,
  StudentInfo,
  TimelineEvent
} from "constants/types"
import SubmissionFileUploadTab from "../SubmissionFileUploadTab"
import {api, methods} from "constants/routes"
import {download, oldRequest, request} from "utils/api"
import SubmitDeclarationSection from "../SubmissionDeclarationTab";
import authenticationService from "utils/auth"
import SubmissionGroupFormation, {Role} from "../SubmissionGroupFormation";
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
  exerciseNumber: number
}

const SubmissionSection: React.FC<Props> = ({
  event,
  activeDay,
  courseCode,
  exerciseNumber,
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
  const [activeStage, setActiveStage] = useState(event?.assessment === "group" ? "1" : "0")
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
    request<{ [k: string]: StudentInfo }>({
      api: api.CATE_AVAILABLE_STUDENTS_FOR_EXERCISE(courseCode, exerciseNumber),
      method: methods.GET,
    })
    .then(data => {
      if (data) {
        setAvailableStudents(Object.keys(data).map((key, _) => data[key]))
      }
      loaded(LoadingParts.AVAILABLE_STUDENTS)
    })
    .catch(() => loadError(LoadingParts.AVAILABLE_STUDENTS))
  }

  const updateGroupMember = (method: string, username: string) => {
    request({
      api: api.CATE_GROUP_FORMATION(courseCode, exerciseNumber, groupID, username),
      method: method,
    })
    .catch(message => console.log(`Failed to update new team member: ${message}`))
    .finally(() => {
      retrieveGroupInfo()
      retrieveAvailableStudents()
    })
  }

  const retrieveGroupInfo = async () => {
    request<{ id: string, members: { [attr: string]: string }[] } | undefined>({
      api: api.CATE_GROUP_SINGLE_MEMBER(courseCode, exerciseNumber, currentUser),
      method: methods.GET,
    })
    .then(data => {
      if (data) {
        const { id, members } = data
        setGroupID(id)
        setGroupMembers(members.map((memberInfo: { [attr: string]: string }) => ({
          username: memberInfo.username,
          realName: `${memberInfo.lastname}, ${memberInfo.firstname}`,
          classEnrolled: memberInfo.class,
          role: memberInfo.role,
          signatureTime: memberInfo.signature === "Unsigned" ? undefined : moment(memberInfo.signature).toDate()
        })))
      } else {
        setGroupID("")
        setGroupMembers([])
      }
      loaded(LoadingParts.GROUP_INFO)
    })
    .catch(error => loadError(LoadingParts.GROUP_INFO))
  }

  const createGroup = () => {
    oldRequest({
      url: api.CATE_GROUP_SINGLE_MEMBER(courseCode, exerciseNumber, currentUser).url,
      method: methods.POST,
      onSuccess: () => {},
      onError: (message: string) => console.log(`Failed to create a new group: ${message}`),
    }).finally(refreshAllParts)
  }
  const deleteGroup = () => {
    oldRequest({
      url: api.CATE_DELETE_GROUP(courseCode, exerciseNumber, groupID).url,
      method: methods.DELETE,
      onSuccess: () => {},
      onError: (message: string) => console.log(`Failed to delete group ${groupID}: ${message}`),
    }).finally(refreshAllParts)
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
      api: api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, currentUser),
      method: methods.POST,
      body: newStatus,
    })
    .then(() => {
      const formData = new FormData()
      formData.append("fileID", String(index))
      formData.append("file", newFile)
      return request<number>({
        api: api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, currentUser),
        method: methods.PUT,
        body: formData,
        sendFile: true,
      })
    })
    .finally(refreshAllParts)
  }

  const removeFile = (courseworkSubmissionID: number) => {
    request({
      api: api.CATE_RAW_SUBMISSION(courseworkSubmissionID),
      method: methods.DELETE,
    }).finally(refreshAllParts)
  }

  const downloadFile = (courseworkSubmissionID: number, filename: string, suffix: string) => {
    download(api.CATE_RAW_SUBMISSION(courseworkSubmissionID), `${filename}.${suffix}`)
  }

  const retrieveFileStatus = async () => request<ResourceUploadRequirement[]>({
    api: api.CATE_FILE_UPLOAD(courseCode, exerciseNumber, currentUser),
    method: methods.GET,
  }).then(requirements => {
    setRequirements(requirements)
    loaded(LoadingParts.FILE_STATUS)
  }).catch(() => {
    loadError(LoadingParts.FILE_STATUS)
  })


  /* ================================ Declaration ================================ */
  const addDeclarationHelper = (name: string, login: string) => {
    uploadDeclaration({
      name: name,
      login: login,
    })
  }

  const removeDeclarationHelper = (targetName: string, targetLogin: string) => {
    oldRequest({
      url: api.CATE_DECLARATION(courseCode, exerciseNumber, currentUser).url,
      method: methods.DELETE,
      body: {
        "name": targetName,
        "login": targetLogin,
      },
      onSuccess: () => {},
      onError: () => alert("error")
    }).then(refreshAllParts)
  }

  const uploadDeclaration = (data: "Unaided" | DeclarationHelper | undefined) => {
    oldRequest({
      url: api.CATE_DECLARATION(courseCode, exerciseNumber, currentUser).url,
      method: methods.PUT,
      body: {
        declaration: data
      },
      onSuccess: () => {},
      onError: () => alert("error")
    }).then(refreshAllParts)
  }

  const retrieveDeclaration = async () => oldRequest({
    url: api.CATE_DECLARATION(courseCode, exerciseNumber, currentUser).url,
    method: methods.GET,
    onSuccess: (data: DeclarationInfo) => {
      if (data.status === "Unaided") {
        setDeclarationStatus(DeclarationStatus.UNAIDED)
        setDeclaredHelpers([])
      } else {
        setDeclarationStatus(DeclarationStatus.WITH_HELP)
        setDeclaredHelpers(data.helpers)
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

  const userIsLeader = groupMembers.filter(m => m.username === currentUser && m.role === Role.LEADER).length !== 0

  const mainSectionDict: EnumDictionary<Stage, JSX.Element> = {
    [Stage.GROUP_FORMATION]: (
      <SubmissionGroupFormation
          groupID={groupID}
          groupMembers={groupMembers}
          availableStudents={availableStudents}
          addNewGroupMember={(username: string) => updateGroupMember(methods.PUT, username)}
          removeGroupMember={(username: string) => updateGroupMember(methods.DELETE, username)}
          addMemberSignature={(username: string) => updateGroupMember(methods.POST, username)}
          createGroup={createGroup}
          deleteGroup={deleteGroup}
      />
    ),
    [Stage.FILE_UPLOAD]: (
      <div>
        <SubmissionFileUploadTab
          enableFileUpload={(event?.assessment === "group" && groupID !== "" && userIsLeader) || event?.assessment !== "group"}
          requiredResources={requirements}
          uploadFile={uploadFile}
          removeFile={removeFile}
          downloadFile={downloadFile}
          refresh={refreshAllParts}
          onWarningSectionClick={openGroupFormationTab}
        />
        <hr/>
        <SubmitDeclarationSection
          activate={event?.assessment !== "group" || userIsLeader}
          status={declarationStatus}
          declaredHelpers={declaredHelpers}
          onSetUnaided={() => {
            uploadDeclaration("Unaided")
          }}
          onSetWithHelp={() => {
            uploadDeclaration(undefined)
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
      <div key={index}>
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
