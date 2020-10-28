import Card from 'react-bootstrap/Card'
import styles from "./style.module.scss"
import React from "react";
import classNames from "classnames";
import {GroupFormationMemberInfo} from "../../../constants/types";


interface Props {
  memberInfo: GroupFormationMemberInfo
}

const GroupMemberCard: React.FC<Props> = ({
  memberInfo
}) => {
  return (
    <Card
      className={classNames(styles.groupMemberCard)}
    >
      <Card.Header>{memberInfo.name}</Card.Header>
      <Card.Body>
        <Card.Title>{memberInfo.role}</Card.Title>
        <Card.Subtitle>
          {memberInfo.username}
        </Card.Subtitle>
        <Card.Text>
          {memberInfo.classEnrolled}
          {(!memberInfo.signatureTime && (
            <span className={styles.unsignedLabel}>NOT YET SIGNED</span>
          )) ||
          (memberInfo.signatureTime?.toISOString().slice(0, 10))}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card>
)
}

export default GroupMemberCard