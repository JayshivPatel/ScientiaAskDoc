import React from "react"
import styles from "./style.module.scss"

import Jumbotron from "react-bootstrap/Jumbotron"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

const WarningJumbotron: React.FC<{ message: string }> = ({ message }) => {
  return (
    <Jumbotron className={styles.jumbotron}>
      <h4>
        <FontAwesomeIcon icon={faExclamationTriangle} />
        &emsp;Oh no...
      </h4>
      <p>{message}</p>
    </Jumbotron>
  )
}

export default WarningJumbotron
