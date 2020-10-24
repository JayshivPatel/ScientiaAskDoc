import React, {useEffect, useState} from "react";
import styles from "./style.module.scss"
import authenticationService from "utils/auth"
import {request} from "../../../utils/api";
import {api, methods} from "../../../constants/routes";
import Table from "react-bootstrap/Table";

interface UserInfo {
    username: string,
    name: string
    classEnrolled: string,
    role: string,
    signatureTime: Date
}

const tableHeadings = [
    "Student",
    "Class",
    "Role",
    "Signature",
    "Delete"
]

interface Props {
    // currentUserInfo: UserInfo | undefined
}

const SubmissionGroupFormation: React.FC<Props> = ({

}) => {
    const [currentUserInfo, setCurrentUserInfo] = useState<UserInfo>()
    useEffect(() => {
        // Load the user information of the current user
        const currentUser = authenticationService.getUserInfo()["username"]
        request({
            url: api.CATE_USER_INFO(currentUser),
            method: methods.GET,
            onSuccess: (data: { [k: string]: any }) => {
                setCurrentUserInfo({
                    username: currentUser,
                    name: `${data.lastname}, ${data.firstname}`,
                    classEnrolled: "c3", // Is not included in the current data format
                    role: "Leader",
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
                {/* Should be the delete checkbox */}
            </td>
        </tr>
    )

    return (
        <div>
            <span className={styles.sectionHeader}>Group Members</span>
            <Table responsive>
                <thead>
                    { tableHeadings.map((heading) => (
                        <th key={heading}>{heading}</th>
                    ))}
                </thead>
                <tbody>
                    { currentUserInfo && studentInfoRow(currentUserInfo) }
                </tbody>
            </Table>
        </div>);
}

export default SubmissionGroupFormation