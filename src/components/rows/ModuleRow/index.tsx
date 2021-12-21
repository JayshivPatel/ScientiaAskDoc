import { faCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Module } from "constants/types"
import React from "react"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import history from "../../../history"
import styles from "./style.module.scss"

export interface ModuleRowProps {
  module: Module
  year: string
}

const ModuleRow: React.FC<ModuleRowProps> = ({
  module,
  year,
}: ModuleRowProps) => {
  return (
    <Row className={styles.moduleRow}>
      <Button
        className={styles.moduleButton}
        onClick={() => history.push(`/${year}/modules/${module.code}`)}
      >
        <div id="title" className={styles.leftContainer}>
          <FontAwesomeIcon
            className={
              !module.has_materials ? styles.noMaterials : styles.materials
            }
            icon={faCircle}
          />
          <span className={styles.moduleTitle}>{module.title}</span>
        </div>
        <div className={styles.rightContainer}>{module.code}</div>
      </Button>
    </Row>
  )
}

export default ModuleRow
