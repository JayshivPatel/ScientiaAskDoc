import React from "react"
import styles from "./style.module.scss"
import Col from "react-bootstrap/Col"

import classNames from "classnames"

import ModuleRow from "components/rows/ModuleRow"
import Dandruff from "components/headings/Dandruff"
import { Module } from "constants/types"

export interface ModuleListProps {
  modules: Module[]
  modulesFilter: String
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  modulesFilter,
}: ModuleListProps) => {
  return (
    <>
      <Dandruff heading="Modules" />
      {/*
          <h4 className={classNames(styles.moduleSectionHeader)}>
            First Year Undergraduate
          </h4>
          <p className={classNames(styles.moduleParagraph)}>
            There are eight core modules, each with their own coursework and written
            examination: Introduction to Computer Systems, Introduction to Computer
            Architecture, Logic, Reasoning about Programs, Mathematics I, Discrete
            Structures, Graphs and Algorithms, Introduction to Databases.
          </p>
      */}

      <h4 className={classNames(styles.moduleSectionHeader)}>Your modules</h4>
      <p className={classNames(styles.moduleParagraph)}>
        These are the modules you are currently enrolled for. Click on any to
        access the relevant teaching materials and resources.
      </p>
      <div role="group">
        {modules
          .filter(
            ({ progressStatus }) =>
              modulesFilter === "" || progressStatus === modulesFilter
          )
          .map((module) => (
            <ModuleRow module={module} key={module.code} />
          ))}
      </div>
    </>
  )
}

export default ModuleList
