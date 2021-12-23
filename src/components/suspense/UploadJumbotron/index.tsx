import React from "react"
import styles from "./style.module.scss"
import classNames from "classnames"

import Jumbotron from "react-bootstrap/Jumbotron"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUpload } from "@fortawesome/free-solid-svg-icons"

interface UploadJumbotronProps {
  message: string
  onClick: () => void
}

const UploadJumbotron: React.FC<UploadJumbotronProps> = ({
  message,
  onClick,
}) => {
  return (
    <Jumbotron
      className={classNames(styles.jumbotron, styles.clickable)}
      onClick={onClick}>
      <h4>
        <FontAwesomeIcon icon={faUpload} />
        &emsp;Click here to upload!
      </h4>
      <p>{message}</p>
    </Jumbotron>
  )
}

export default UploadJumbotron
