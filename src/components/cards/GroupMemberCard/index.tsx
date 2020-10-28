import styles from "./style.module.scss"
import React from "react";
import classNames from "classnames";
import Image from "react-bootstrap/Image"
import {GroupFormationMemberInfo} from "../../../constants/types";
import Container from "react-bootstrap/Container"
import {theme} from "../../../utils/functions";

interface Props {
  memberInfo: GroupFormationMemberInfo
}

const GroupMemberCard: React.FC<Props> = ({
  memberInfo
}) => {
  return (
    <Container
      className={classNames(styles.groupMemberCard)}
    >
      <Image
        src={`/images/${theme()}/user.png`}
        className={styles.profilePic}
      />
      <div>
        <h5 className={styles.memberName}>{memberInfo.name}<br/>({memberInfo.username})</h5>
        <p className={styles.memberRole}>{memberInfo.role}</p>
        <p className={styles.memberClass}>{memberInfo.classEnrolled}</p>
      </div>
    </Container>
)
}

export default GroupMemberCard