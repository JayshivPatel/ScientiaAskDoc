import { Module, TimelineEvent } from "../../../constants/types"
import { YEAR_OF_NEW_CODES } from "../../../constants/doc"
import { request } from "../../../utils/api"
import { api, methods } from "../../../constants/routes"
import ModulesSubRouter from "./ModulesSubRouter"
import { TimelineSubRoute } from "./TimelineSubRoute"
import React, { useEffect, useState } from "react"
import { Route, Switch, useRouteMatch } from "react-router-dom"

interface YearSubRouter {
  year: string
  timelineConfig: {
    onEventClick: (e?: TimelineEvent) => void
    initSideBar: () => void
    revertSideBar: () => void
  }
}

const YearSubRouter: React.FC<YearSubRouter> = ({
  year,
  timelineConfig,
}: YearSubRouter) => {
  let { path, url } = useRouteMatch()
  const [modules, setModules] = useState<Module[]>([])
  useEffect(() => {
    const onSuccess = (modules: Module[]) => {
      setModules(
        modules.map((module) => ({
          title: module.title,
          code: year < YEAR_OF_NEW_CODES ? `CO${module.code}` : module.code,
          can_manage: module.can_manage,
          has_materials: module.has_materials,
          // Hardcoded stuff, we don't have this data currently
          terms: ["Autumn", "Spring", "Summer"],
          content: "",
          subscriptionLevel: (Math.floor(Math.random() * 3) + 1) as 1 | 2 | 3,
        }))
      )
    }

    request({
      endpoint: api.MATERIALS_COURSES(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain modules: ${message}`),
    })
  }, [year])

  return (
    <Switch>
      <Route path={`${path}/modules`}>
        <ModulesSubRouter year={year} modules={modules} />
      </Route>

      <Route path={`${path}/timeline`}>
        <TimelineSubRoute
          timelineConfig={timelineConfig}
          modules={modules}
          year={year}
        />
      </Route>
    </Switch>
  )
}

export default YearSubRouter
