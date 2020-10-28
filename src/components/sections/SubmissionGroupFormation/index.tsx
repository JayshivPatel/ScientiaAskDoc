import React, {useEffect, useState} from "react";
import styles from "./style.module.scss"
import authenticationService from "utils/auth"
import Table from "react-bootstrap/Table";
import Select from "react-select"
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {GroupFormationMemberInfo, StudentInfo} from "../../../constants/types";

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

enum Role {
    LEADER = "Leader",
    MEMBER = "Member"
}

interface Option {
    label: string
    value: string
}

const createOption = (student: StudentInfo) => {
    const promptText = `${student.lastname}, ${student.firstname} (${student.username}) - ${student.class}`
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
    refresh: () => void
}

const SubmissionGroupFormation: React.FC<Props> = ({
    groupID,
    groupMembers,
    availableStudents,
    addNewGroupMember,
    removeGroupMember,
    refresh,
}) => {
    const [newMember, setNewMember] = useState("")
    const [availableStudentOptions, setAvailableStudentOptions] = useState<Option[]>(
        availableStudents.map(createOption)
    )
    const isLeader = (username: string) => {
        if (groupMembers.length  === 0) {
            return true
        }
        const leaderInfo = groupMembers.filter((member) => member.role === "leader")[0]
        return leaderInfo.username === username;
    }
    const currentUser = authenticationService.getUserInfo()["username"]
    const currentRole: string = isLeader(currentUser) ? Role.LEADER : Role.MEMBER

    const studentInfoRow = (studentInfo: GroupFormationMemberInfo) => (
        <tr key={`${studentInfo.name}`}>
            <td>
                {studentInfo.name} ({studentInfo.username})
            </td>
            <td>
                {studentInfo.classEnrolled}
            </td>
            <td>
                {studentInfo.role}
            </td>
            <td>
                {(!studentInfo.signatureTime && (
                    <span className={styles.unsignedLabel}>NOT YET SIGNED</span>
                )) ||
                (studentInfo.signatureTime?.toISOString().slice(0, 10))}
            </td>
            <td>
                {/*
                    * Display the checkbox if:
                    * 1. the current user is a group member, the username in studentInfo matches that of the current
                    *  user, and the current user has not yet signed
                    * 2. the current user is the leader and the username in studentInfo does not match the
                    * that of the current user
                    * */
                }
                {(((currentRole === Role.MEMBER && currentUser === studentInfo.username && !studentInfo.signatureTime)
                        || (currentRole === Role.LEADER && currentUser !== studentInfo.username)) && (
                            <Form.Group controlId="signatureCheckbox">
                                <Form.Check type="checkbox"/>
                            </Form.Group>
                    )
                )}
            </td>
        </tr>
    )
    console.log(groupMembers)
    const leaderButtonGroup = (hasMembers: boolean) => (
        <>
            {
                hasMembers && (
                <Form.Row style={{paddingBottom: "0.5em"}}>
                    <Col>
                        <Button
                            className={styles.sectionButton}
                        >
                            Delete
                        </Button>
                    </Col>
                    <Col>
                        <Button
                            className={styles.sectionButton}
                        >
                            Reset
                        </Button>
                    </Col>
                </Form.Row>)
            }
            <Form.Row>
                <Col>
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
                <Col>
                    <Button
                        className={styles.sectionButton}
                        onClick={() => {
                            addNewGroupMember(newMember)
                            setNewMember('')
                        }}
                    >
                        Add group member
                    </Button>
                </Col>
            </Form.Row>
        </>
    )

    return (
        <div>
            <span className={styles.sectionHeader}>Group Members</span>
            <Table responsive style={{marginBottom: 0}}>
                <thead>
                    <tr>
                        { (isLeader(currentUser) ? tableHeadingsLeader : tableHeadingsMember).map((heading) => (
                            <th key={heading}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { groupMembers && (groupMembers.map((memberInfo: GroupFormationMemberInfo) => studentInfoRow(memberInfo)))}
                </tbody>
            </Table>
            <Form>
                { (currentRole === Role.LEADER && leaderButtonGroup(groupMembers.length > 1)) }
            </Form>
        </div>);
}

export default SubmissionGroupFormation