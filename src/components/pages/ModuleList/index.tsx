import React from "react"
import styles from "./style.module.scss"
import { Helmet } from "react-helmet"

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
  const compareModules = (module1: Module, module2: Module) => {
    let code1 = module1.code, code2 = module2.code
    return (code1 > code2) ? 1 : (code1 === code2) ? 0 : -1
  }

  return (
    <>
      <Helmet>
        <title>Modules | Scientia</title>
      </Helmet>
      <Dandruff heading="Modules" />
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
          .sort((module1, module2) => compareModules(module1, module2))
          .map((module) => (
            <ModuleRow module={module} key={module.code} />
          ))}
      </div>
    </>
  )
}

export default ModuleList
