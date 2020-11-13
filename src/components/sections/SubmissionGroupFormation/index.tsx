import React, {useEffect, useState} from "react";
import styles from "./style.module.scss"
import authenticationService from "utils/auth"
import Select from "react-select"
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {GroupFormationMemberInfo, StudentInfo} from "../../../constants/types";
import GroupMemberCard from "../../cards/GroupMemberCard";
import Row from "react-bootstrap/Row"
import {faPlus, faUserPlus, faUsers} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Container from "react-bootstrap/cjs/Container";
import { AuthService } from "constants/auth";

const tableHeadingsLeader = [
  "Student",
  "Class",
  "Role",
  "Signature",
  "Delete"
]

const tableHeadingsMember = [
  "Student",
  "Class",
  "Role",
  "Signature",
  "Sign"
]

export enum Role {
  LEADER = "leader",
  MEMBER = "member"
}

interface Option {
  label: string
  value: string
}

const createOption = (student: StudentInfo) => {
  const promptText = `${student.lastname}, ${student.firstname} (${student.username}) - ${student.cohort}`
  return {
    label: promptText,
    value: student.username
  }
}

interface Props {
  groupID: string
  groupMembers: GroupFormationMemberInfo[]
  availableStudents: StudentInfo[]
  addNewGroupMember: (username: string) => void
  removeGroupMember: (username: string) => void
  addMemberSignature: (username: string) => void
  createGroup: () => void
  deleteGroup: () => void
}

const SubmissionGroupFormation: React.FC<Props> = ({
                                                     groupID,
                                                     groupMembers,
                                                     availableStudents,
                                                     addNewGroupMember,
                                                     removeGroupMember,
                                                     addMemberSignature,
                                                     createGroup,
                                                     deleteGroup
                                                   }) => {
  const [newMember, setNewMember] = useState("")
  const [availableStudentOptions, setAvailableStudentOptions] = useState<Option[]>([])
  useEffect(() => {
    setAvailableStudentOptions(availableStudents.map(createOption))
  }, [availableStudents])

  const isLeader = (username: string) => {
    if (groupMembers.length === 0) {
      return true
    }
    const leaderInfo = groupMembers.filter((member) => member.role === "leader")[0]
    return leaderInfo.username === username;
  }
  const currentUser = authenticationService.getUserInfo()["username"]
  const currentRole: string = isLeader(currentUser) ? Role.LEADER : Role.MEMBER

  const leaderButtonGroup = () => (
    <>
      <Form.Row>
        <Col xs={11}>
          <Select
            className={styles.select}
            menuPlacement="auto"
            value={availableStudentOptions.filter((option) => option.value == newMember)}
            options={availableStudentOptions}
            onChange={(selectedMember) =>
              setNewMember(selectedMember ? (selectedMember as Option).value : "")
            }
          />
        </Col>
        <Col xs={1}>
          <Button
            className={styles.sectionButton}
            onClick={() => {
              addNewGroupMember(newMember)
              setNewMember('')
            }}
          >
            <FontAwesomeIcon icon={faUserPlus}/>
          </Button>
        </Col>
      </Form.Row>
      <Form.Row>
        <Col>
          <Button className={styles.deleteGroupButton} onClick={() => deleteGroup()}>
            Delete Group
          </Button>
        </Col>
      </Form.Row>
    </>
  )

  const groupMemberDisplay = (
    <>
      <Row md={2} noGutters={true}>
        {
          groupMembers && (groupMembers.map(
              (memberInfo: GroupFormationMemberInfo) => {
                const { username, realName, classEnrolled, role, signatureTime } = memberInfo
                const onRemoveButtonClick =
                  currentRole === Role.LEADER && !signatureTime ? removeGroupMember : undefined
                const onClick = currentRole === Role.MEMBER && username === currentUser && !signatureTime ?
                  () => addMemberSignature(username) : undefined
                return (
                  <GroupMemberCard
                    key={username}
                    currentUser={currentUser}
                    currentRole={currentRole}
                    username={username}
                    realName={realName}
                    classEnrolled={classEnrolled}
                    role={role}
                    signatureTime={signatureTime}
                    onRemoveButtonClick={onRemoveButtonClick}
                    onClick={onClick}
                  />
                )
              }
            )
          )
        }
      </Row>
      <Form>
        {(currentRole === Role.LEADER && leaderButtonGroup())}
      </Form>
    </>
  )

  const groupCreationDisplay = (
    <Container onClick={() => createGroup()} className={styles.createGroupSection}>
      <FontAwesomeIcon icon={faUsers} style={{fontSize: "3.5rem", marginRight: "2rem"}}/>
      <span className={styles.createLabel}>Create Your Group</span>
    </Container>
  )

  return (
    <div>
      {(groupMembers.length === 0 && groupCreationDisplay) || (groupMembers.length !== 0 && groupMemberDisplay)}
    </div>);
}
export default SubmissionGroupFormation