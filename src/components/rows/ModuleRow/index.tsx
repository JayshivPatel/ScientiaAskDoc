import React from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import classnames from "classnames"
import { Module } from "constants/types"
import styles from "./style.module.scss"
import history from "../../../history"

export interface ModuleRowProps {
  module: Module
}

const ModuleRow: React.FC<ModuleRowProps> = ({ module }: ModuleRowProps) => {
  return (
    <div
      className={styles.moduleContainer}
      onClick={() => history.push(`/modules/${module.code}`)}>
      <Row className={styles.moduleRow}>
        <Button style={{ height: "4rem" }}>
          <div className={styles.moduleTitle}>{module.title}</div>
          <div>{module.code}</div>
        </Button>
      </Row>
    </div>
  )
}

export default ModuleRow
