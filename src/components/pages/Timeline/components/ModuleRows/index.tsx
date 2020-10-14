import React, { ReactElement } from "react"
import styles from "./style.module.scss"
import { ModuleTracks } from "../.."
import ModuleHeading from "../ModuleHeading"
import classNames from "classnames"
import { Module } from "constants/types"

export interface ModuleRowsProps {
  numWeeks: number
  trackHeight: number
  modulesList: Module[]
  modulesTracks: ModuleTracks
}

const ModuleRows: React.FC<ModuleRowsProps> = ({
  numWeeks,
  trackHeight,
  modulesList,
  modulesTracks,
}) => {
  let timelineBackgrounds: ReactElement[] = []
  let moduleHeadings: ReactElement[] = []

  for (let i = 0; i < modulesList.length; i++) {
    const code = modulesList[i].code
    const tracks = modulesTracks[code]
    moduleHeadings.push(
      <ModuleHeading
        key={code}
        style={{ height: `${tracks?.length * trackHeight}rem` }}
        moduleCode={code}
        title={modulesList[i].title}
      />
    )
    const timelineBackgroundsClass = classNames(
      i % 2 === 0
        ? styles.timelineBackgroundEven
        : styles.timelineBackgroundOdd,
      i === 0 ? styles.timelineBackgroundFirst : "",
      i === modulesList.length - 1 ? styles.timelineBackgroundLast : ""
    )
    const offset = i === modulesList.length - 1 || i === 0 ? 0.625 / 2 : 0.625
    for (let j = 0; j < numWeeks; j++) {
      timelineBackgrounds.push(
        <div
          key={code + j}
          style={{ height: `${tracks?.length * trackHeight + offset}rem` }}
          className={timelineBackgroundsClass}></div>
      )
    }
  }

  return (
    <>
      <div className={styles.timelineModuleColumn}>{moduleHeadings}</div>
      <div
        className={styles.timelineWeekBackground}
        style={{ gridTemplateColumns: `repeat(${numWeeks}, 15rem)` }}>
        {timelineBackgrounds}
      </div>
    </>
  )
}

export default ModuleRows
