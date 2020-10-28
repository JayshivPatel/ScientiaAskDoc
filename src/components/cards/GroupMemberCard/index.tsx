import styles from "./style.module.scss"
import React from "react";
import classNames from "classnames";
import Image from "react-bootstrap/Image"
import {GroupFormationMemberInfo} from "../../../constants/types";
import Container from "react-bootstrap/Container"
import {theme} from "../../../utils/functions";
import moment from "moment";
import Badge from "react-bootstrap/esm/Badge";

interface ExtraProps {
}

type Props = GroupFormationMemberInfo & ExtraProps


const GroupMemberCard: React.FC<Props> = ({
  username,
  name,
  classEnrolled,
  role,
  signatureTime,
}) => {

  return (
    <Container
      className={classNames(styles.groupMemberCard, role === 'leader' && styles.leaderCard)}
    >
      <div style={{ verticalAlign: 'top', height: '100%', paddingTop: '0.5rem' }}>
        <Image
          src={`/images/${theme()}/user.png`}
          className={styles.profilePic}
        />
      </div>
      <div className={styles.memberInfoSection}>
        <h4 className={styles.memberName}>
          {name}
        </h4>
        <div style={{ display: 'flex' }}>
          <h6 className={styles.memberName}>{username}</h6>
          <p className={styles.memberClass}>{classEnrolled}</p>
        </div>
        <Badge 
          pill 
          key={"sign"} 
          className={classNames(
            styles.tag,
            signatureTime ? styles.tagTeal : styles.tagPink
          )}
        >
          {signatureTime ? moment(signatureTime).fromNow().toUpperCase() : "NOT SIGNED"}
        </Badge>
      </div>
    </Container>
)
}

export default GroupMemberCard