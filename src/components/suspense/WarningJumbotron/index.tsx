import React from "react"
import styles from "./style.module.scss"

import Jumbotron from "react-bootstrap/Jumbotron"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons"

interface WarningJumbotronProps {
  message: string
}

const WarningJumbotron: React.FC<WarningJumbotronProps> = ({ message }) => {
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
