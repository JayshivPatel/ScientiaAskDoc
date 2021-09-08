import { Module } from "../../../constants/types"
import { Route, Switch, useRouteMatch } from "react-router-dom"
import React from "react"
import Container from "react-bootstrap/esm/Container"
import classNames from "classnames"

const ModuleList = React.lazy(() => import("../ModuleList"))
const ModuleResources = React.lazy(
  () => import("../modulePages/ModuleResources")
)
const ModuleResource = React.lazy(() => import("../modulePages/ModuleResource"))
const ModuleFeedbackResources = React.lazy(
  () => import("../modulePages/ModuleFeedbackResources")
)
const ModuleFeedbackResource = React.lazy(
  () => import("../modulePages/ModuleFeedbackResource")
)
const ModuleDashboard = React.lazy(
  () => import("../modulePages/ModuleDashboard")
)

interface ModulesSubRouterProps {
  year: string
  modules: Module[]
}

const ModulesSubRouter: React.FC<ModulesSubRouterProps> = ({
  year,
  modules,
}: ModulesSubRouterProps) => {
  let { path, url } = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <Container className={classNames("pageContainer")}>
          <ModuleList modules={modules} />
        </Container>
      </Route>

      <Route
        path={`${path}/:id/dashboard`}
        render={(props) => {
          let moduleTitle =
            modules.find((module) => module.code === props.match.params.id)
              ?.title || ""
          return (
            <Container className={classNames("pageContainer")}>
              <ModuleDashboard
                year={year}
                moduleTitle={moduleTitle}
                moduleID={props.match.params.id}
              />
            </Container>
          )
        }}
      />

      <Route
        path={`${path}/:id/resources/:category/:index`}
        render={(props) => {
          let moduleTitle =
            modules.find((module) => module.code === props.match.params.id)
              ?.title || ""
          return (
            <Container className={classNames("pageContainer centerContents")}>
              <ModuleResource
                moduleTitle={moduleTitle}
                year={year}
                course={props.match.params.id}
                category={props.match.params.category}
                index={+props.match.params.index}
              />
            </Container>
          )
        }}
      />

      <Route
        path={`${path}/:id/resources/:scope?`}
        render={(props) => {
          let moduleTitle =
            modules.find((module) => module.code === props.match.params.id)
              ?.title || ""
          let canManage =
            modules.find((module) => module.code === props.match.params.id)
              ?.can_manage || false
          return (
            <Container className={classNames("pageContainer")}>
              <ModuleResources
                year={year}
                moduleTitle={moduleTitle}
                moduleID={props.match.params.id}
                scope={props.match.params.scope}
                view={localStorage.getItem("fileView") || "card"}
                canManage={canManage}
              />
            </Container>
          )
        }}
      />

      <Route
        path={`${path}/:id/feedback/:exercise`}
        render={(props) => {
          let moduleTitle =
            modules.find((module) => module.code === props.match.params.id)
              ?.title || ""
          return (
            <Container className={classNames("pageContainer centerContents")}>
              <ModuleFeedbackResource
                moduleTitle={moduleTitle}
                year={year}
                course={props.match.params.id}
                exercise={parseInt(props.match.params.exercise)}
              />
            </Container>
          )
        }}
      />

      <Route
        path={`${path}/:id/feedback`}
        render={(props) => {
          let moduleTitle =
            modules.find((module) => module.code === props.match.params.id)
              ?.title || ""
          return (
            <Container className={classNames("pageContainer")}>
              <ModuleFeedbackResources
                year={year}
                moduleTitle={moduleTitle}
                moduleID={props.match.params.id}
              />
            </Container>
          )
        }}
      />
    </Switch>
  )
}

export default ModulesSubRouter
