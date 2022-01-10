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
  showSidebars: () => void
  hideSidebars: () => void
  onOverlayClick: (event: React.MouseEvent<HTMLElement>) => void
  onSettingsClick: (event?: React.MouseEvent) => void
  onTimelineEventClick: (e?: TimelineEvent) => void
  onCalendarClick: (e?: CalendarEvent) => void
  year: string
  setYear: (year: string) => void
}

const StandardView: React.FC<StandardViewProps> = ({
  toggledLeft,
  toggledRight,
  onOverlayClick,
  onSettingsClick,
  showSidebars,
  hideSidebars,
  onTimelineEventClick,
  onCalendarClick,
  year,
  setYear,
}: StandardViewProps) => {
  return (
    <div
      id="wrapper"
      className={classNames({
        toggledLeft: toggledLeft,
        toggledRight: toggledRight,
      })}>
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
                  setYear={setYear}
                  showSidebars={showSidebars}
                  hideSidebars={hideSidebars}
                  onTimelineEventClick={onTimelineEventClick}
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
