import React, {useEffect, useState} from "react";
import styles from "./style.module.scss"
import authenticationService from "utils/auth"
import {request} from "../../../utils/api";
import {api, methods} from "../../../constants/routes";
import Table from "react-bootstrap/Table";
import SearchBox from "../../headings/SearchBox";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {UserInfo} from "../../../constants/types";

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

interface Props {
    groupMembers: UserInfo[];
    onGroupMemberChange: (members: []) => void
}

const SubmissionGroupFormation: React.FC<Props> = ({
    groupMembers,
    onGroupMemberChange
}) => {
    const [searchText, setSearchText] = useState("")
    const [members, addGroupMember] = useState<UserInfo[]>([])
    const [username, setUserName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [classEnrolled, setClassEnrolled] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [signatureTime, setSignatureTime] = useState<Date>(new Date())
    const isLeader = (username: string) => {
        const leaderInfo = groupMembers.filter((member) => member.role == "leader")[0]
        return leaderInfo.username == username;
    }
    const currentUser = authenticationService.getUserInfo()["username"]
    const currentRole: string = isLeader(currentUser) ? Role.LEADER : Role.MEMBER

    const addRow = (username: string, name: string, classEnrolled: string, role: string, signatureTime: Date) => {
        addGroupMember([...members, {username, name, classEnrolled, role, signatureTime}])
        setUserName(username)
        setName(name)
        setClassEnrolled(classEnrolled)
        setRole(role)
        setSignatureTime(new Date())
    }

    const studentInfoRow = (studentInfo: UserInfo) => (
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
                {studentInfo.signatureTime.toISOString().slice(0, 10)}
            </td>
            <td>
                {/* Should be the delete checkbox for leader or sign checkbox for member */}
            </td>
        </tr>
    )

    const memberButtonGroup = (
        <Form.Row>
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
        </Form.Row>
    )

    const leaderButtonGroup = (
        <Form.Row>
            <Col>
                <SearchBox
                    onSearchTextChange={setSearchText}
                    searchText={searchText}
                />
            </Col>
            <Col>
                <Button
                    className={styles.sectionButton}
                    onClick={() => addRow(username, name, classEnrolled, role, signatureTime)}
                >
                    Add group member
                </Button>
            </Col>
        </Form.Row>
    )

    return (
        <div>
            <span className={styles.sectionHeader}>Group Members</span>
            <Table responsive>
                <thead>
                    <tr>
                        { (isLeader(currentUser) ? tableHeadingsLeader : tableHeadingsMember).map((heading) => (
                            <th key={heading}>{heading}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    { groupMembers && (groupMembers.map((memberInfo: UserInfo) => studentInfoRow(memberInfo)))}
                </tbody>
            </Table>
            <Form>
                { (currentRole == Role.LEADER && leaderButtonGroup) || (currentRole == Role.MEMBER && memberButtonGroup) }
            </Form>
        </div>);
}

export default SubmissionGroupFormation