import { Module, Term, TimelineEvent } from "../../../constants/types"
import getDefaultTerm from "../Timeline/defaultTerms"
import { request } from "../../../utils/api"
import { api, methods } from "../../../constants/routes"
import React, { useEffect, useState } from "react"
import moment from "moment"

const Timeline = React.lazy(() => import("../Timeline"))

interface TimelineRouteProps {
  year: string
  timelineConfig: {
    onEventClick: (e?: TimelineEvent) => void
    initSideBar: () => void
    revertSideBar: () => void
  }
  modules: Module[]
}

export const TimelineSubRoute: React.FC<TimelineRouteProps> = ({
  year,
  timelineConfig,
  modules,
}: TimelineRouteProps) => {
  const KNOWN_NUMBER_OF_TERMS = 6
  const [activeTerm, setActiveTerm] = useState<Term>(getDefaultTerm())
  const [terms, setTerms] = useState<Term[]>([])

  useEffect(() => {
    function getCurrentTerm(terms: Term[]): Term {
      const today = new Date().getTime()
      return terms.find(
        (term) => term.start.getTime() <= today && today <= term.end.getTime()
      ) as Term
    }

    function adjustToNextMonday(date: Date): Date {
      const MONDAY = 1
      if (moment(date).isoWeekday() <= MONDAY)
        return moment(date).isoWeekday(MONDAY).toDate()
      return moment(date).add(1, "weeks").isoWeekday(MONDAY).toDate()
    }

    const onSuccess = (data: Term[]) => {
      let terms = data
        .map((t) => {
          return {
            ...t,
            start: adjustToNextMonday(new Date(t.start)),
            end: new Date(t.end),
          }
        })
        .sort((t1, t2) => (t1.end < t2.end ? -1 : 1))
      if (terms.length === KNOWN_NUMBER_OF_TERMS) {
        setActiveTerm(getCurrentTerm(terms))
        setTerms(terms)
      } else console.error(`Invalid number of terms received: ${terms}`)
    }

    request({
      endpoint: api.DBC_TERMS(year),
      method: methods.GET,
      onSuccess: onSuccess,
      onError: (message) => console.log(`Failed to obtain terms: ${message}`),
    })
  }, [year])

  return (
    <Timeline
      initSideBar={timelineConfig.initSideBar}
      revertSideBar={timelineConfig.revertSideBar}
      activeTerm={activeTerm}
      setActiveTerm={setActiveTerm}
      terms={terms}
      onEventClick={timelineConfig.onEventClick}
      modules={modules}
      year={year}
    />
  )
}
