import React from "react"
import styles from "./style.module.scss"
import { Route, Switch } from "react-router-dom"
import SideBarLinkGroup from "components/groups/SideBarLinkGroup"
import SideBarOutlineGroup from "components/groups/SideBarOutlineGroup"

interface LeftBarProps {
  year: string
}

const LeftBar: React.FC<LeftBarProps> = ({ year }) => {
  const displayYear = `20${year.substring(0, 2)} - 20${year.substring(2, 4)}`
  return (
    <div id={styles.leftbarWrapper}>
      <p className={styles.leftbarStatus}>{displayYear}</p>
      <Switch>
        <Route path="/:year/modules/:id">
          <SideBarOutlineGroup />
        </Route>

        <Route exact path="/:year/modules">
          <SideBarLinkGroup />
        </Route>
        {/*
					<Route path="/exams">
					  <SideBarExamsGroup />
					</Route>
				 */}
        <Route path="/">
          <SideBarLinkGroup />
        </Route>
      </Switch>

      {/*<WorkDueGroup onEventClick={onEventClick} />*/}
    </div>
  )
}

export default LeftBar
