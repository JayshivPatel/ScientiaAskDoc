import styles from "./style.module.scss"
import React from "react";
import classNames from "classnames";
import Image from "react-bootstrap/Image"
import {GroupFormationMemberInfo} from "../../../constants/types";
import Container from "react-bootstrap/Container"
import {theme} from "../../../utils/functions";
import moment from "moment";
import Badge from "react-bootstrap/esm/Badge";
import Col from "react-bootstrap/cjs/Col";
import Button from "react-bootstrap/Button"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faTimes,
} from "@fortawesome/free-solid-svg-icons"
import {Role} from "../../sections/SubmissionGroupFormation";

interface ExtraProps {
  currentRole: string
  onRemoveButtonClick: (username: string) => void
}

type Props = GroupFormationMemberInfo & ExtraProps


const GroupMemberCard: React.FC<Props> = ({
  currentRole,
  username,
  name,
  classEnrolled,
  role,
  signatureTime,
  onRemoveButtonClick,
}) => {

  return (
    <Col style={{padding: "0.5em", zIndex: 0}}>
      <Container
        className={classNames(styles.groupMemberCard, role === 'leader' && styles.leaderCard)}
      >
        <div
             style={{ verticalAlign: 'top', height: '100%', paddingTop: '0.5rem' }}
        >
          <Image
            src={`/images/${theme()}/user.png`}
            className={styles.profilePic}
          />
        </div>
        {!signatureTime && currentRole == Role.LEADER &&
        (<Button
          className={styles.removeButton}
          variant={"secondary"}
          onClick={() => onRemoveButtonClick(username)}
        >
          <FontAwesomeIcon icon={faTimes}/>
        </Button>)}
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
    </Col>
)
}

export default GroupMemberCard