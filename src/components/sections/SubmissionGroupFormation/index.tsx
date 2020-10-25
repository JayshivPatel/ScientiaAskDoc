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

export interface UserInfo {
    username: string,
    name: string
    classEnrolled: string,
    role: string,
    signatureTime: Date
}

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

interface Props {
    groupMembers: UserInfo[];
    onGroupMemberChange: (members: []) => void
}

const SubmissionGroupFormation: React.FC<Props> = ({
    groupMembers,
    onGroupMemberChange
}) => {
    const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo>()
    const [searchText, setSearchText] = useState("")
    const [members, addGroupMember] = useState<UserInfo[]>([])
    const [username, setUserName] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [classEnrolled, setClassEnrolled] = useState<string>("")
    const [role, setRole] = useState<string>("")
    const [signatureTime, setSignatureTime] = useState<Date>(new Date())
    const isLeader = (username: string) => {
        // TODO: Implement this function
        return true;
    }
    const currentUser = authenticationService.getUserInfo()["username"]
    const currentRole: string = isLeader(currentUser) ? "Leader" : "Member"

    const addRow = (username: string, name: string, classEnrolled: string, role: string, signatureTime: Date) => {
        addGroupMember([...members, {username, name, classEnrolled, role, signatureTime}])
        setUserName(username)
        setName(name)
        setClassEnrolled(classEnrolled)
        setRole(role)
        setSignatureTime(new Date())
    }

    useEffect(() => {
        // Load the user information of the current user
        request({
            url: api.CATE_USER_INFO(currentUser),
            method: methods.GET,
            onSuccess: (data: { [k: string]: any }) => {
                setCurrentUserInfo({
                    username: currentUser,
                    name: `${data.lastname}, ${data.firstname}`,
                    classEnrolled: "c3", // Is not included in the current data format
                    role: currentRole,
                    signatureTime: new Date()
                })
            },
            onError: (message: string) => console.log(`Failed to retrieve user information: ${message}`)
        })

    }, [])

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

    return (
        <div>
            <span className={styles.sectionHeader}>Group Members</span>
            <Table responsive>
                <thead>
                    { (isLeader(currentUser) ? tableHeadingsLeader : tableHeadingsMember).map((heading) => (
                        <th key={heading}>{heading}</th>
                    ))}
                </thead>
                <tbody>
                    { currentUserInfo && studentInfoRow(currentUserInfo) }
                </tbody>
            </Table>
            <Form>
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
                <Form.Row>
                    <Col xs={7}>
                        <SearchBox 
                          onSearchTextChange={setSearchText} 
                          searchText={searchText}
                        />
                    </Col>
                    <Col>
                        <Button 
                           className={styles.sectionButton}
                           onClick={() => addRow(username, name, classEnrolled, role, signatureTime)}>
                           Add group member
                        </Button>
                    </Col>
                </Form.Row>
            </Form>
        </div>);
}

export default SubmissionGroupFormation