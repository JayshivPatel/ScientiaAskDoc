import React from "react"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import classNames from "classnames"
import { Module } from "constants/types"
import styles from "./style.module.scss"
import history from "../../../history"

export interface ModuleRowProps {
  module: Module
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module }: ModuleRowProps) => {
  return (
    <div className={styles.moduleContainer}>
      <Row className={styles.moduleRow}>
        <Button
          className={classNames(
            styles.moduleButton,
            !module.has_materials ? styles.noMaterials : ""
          )}
          onClick={() => history.push(`/modules/${module.code}`)}>
          <div className={styles.moduleTitle}>{module.title}</div>
          <div>{module.code}</div>
        </Button>
      </Row>
    </div>
  )
}

export default ModuleRow
