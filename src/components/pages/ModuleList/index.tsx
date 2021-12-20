import React from "react"
import styles from "./style.module.scss"
import { Helmet } from "react-helmet"
import classNames from "classnames"
import ModuleRow from "components/rows/ModuleRow"
import Dandruff from "components/headings/Dandruff"
import { Module } from "constants/types"

export interface ModuleListProps {
  modules: Module[]
  year: string
}

const ModuleList: React.FC<ModuleListProps> = ({
  modules,
  year,
}: ModuleListProps) => {
  const compareModules = (module1: Module, module2: Module) => {
    let code1 = module1.code,
      code2 = module2.code
    return code1 > code2 ? 1 : code1 === code2 ? 0 : -1
  }

  return (
    <>
      <Helmet>
        <title>Modules | Scientia</title>
      </Helmet>
      <Dandruff heading="Modules" />
      <p className={classNames(styles.moduleParagraph)}>
        These are the modules you are currently enrolled for. Click on any to
        access the relevant teaching materials and resources.
      </p>
      <div>
        {modules
          .sort((module1, module2) => compareModules(module1, module2))
          .map((module) => (
            <ModuleRow module={module} key={module.code} year={year} />
          ))}
      </div>
    </>
  )
}

export default ModuleList
