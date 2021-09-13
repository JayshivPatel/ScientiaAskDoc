import React, { Suspense } from "react"
import Container from "react-bootstrap/esm/Container"
import { Redirect, Route, Switch } from "react-router-dom"
import "./style.scss"
import classNames from "classnames"
import { CalendarEvent, TimelineEvent } from "constants/types"
import LoadingScreen from "components/suspense/LoadingScreen"
import RightBar from "components/navbars/RightBar"
import LeftBar from "components/navbars/LeftBar"

import YearSubRouter from "./subrouters/YearSubRouter"

const Dashboard = React.lazy(() => import("components/pages/Dashboard"))

interface StandardViewProps {
  toggledLeft: boolean
  toggledRight: boolean
  initTimelineSideBar: () => void
  revertTimelineSideBar: () => void
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void
  onSettingsClick: (event?: React.MouseEvent) => void
  onEventClick: (e?: TimelineEvent) => void
  onCalendarClick: (e?: CalendarEvent) => void
  year: string
}

const StandardView: React.FC<StandardViewProps> = ({
  toggledLeft,
  toggledRight,
  onOverlayClick,
  onSettingsClick,
  revertTimelineSideBar,
  initTimelineSideBar,
  onEventClick,
  onCalendarClick,
  year,
}: StandardViewProps) => {
  const timelineConfig = {
    onEventClick: onEventClick,
    initSideBar: initTimelineSideBar,
    revertSideBar: revertTimelineSideBar,
  }

  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}
    >
      <LeftBar year={year} />
      <RightBar
        onSettingsClick={onSettingsClick}
        onCalendarClick={onCalendarClick}
      />
      <div id="sidenav-overlay" onClick={(e) => onOverlayClick(e)} />
      <Suspense fallback={<LoadingScreen successful={<></>} />}>
        <Switch>
          <Redirect exact from="/" to={`/${year}/modules`} />
          <Redirect exact from={`/${year}`} to={`/${year}/modules`} />
          <Redirect
            exact
            from={`/${year}/modules/:id`}
            to={`/${year}/modules/:id/resources`}
          />

          <Route path="/dashboard">
            <Container className={classNames("pageContainer")}>
              <Dashboard />
            </Container>
          </Route>

          <Route
            path="/:year"
            render={(props) => {
              return (
                <YearSubRouter
                  year={props.match.params.year}
                  timelineConfig={timelineConfig}
                />
              )
            }}
          />
        </Switch>
      </Suspense>
    </div>
  )
}

export default StandardView
