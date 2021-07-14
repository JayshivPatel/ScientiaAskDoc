import React from "react"
import {mount} from "enzyme"
import {TimelineEvent} from "../../../constants/types"
import ModuleEventCard from "./index"

describe("<ModuleEventCard />", () => {
  const timelineEvent: TimelineEvent = {
    title: "Coursework 1",
    id: 0,
    prefix: "CW",
    assessment: "unassessed",
    status: "due",
    owner: "mjw03",
    moduleCode: "",
    startDate: new Date(),
    endDate: new Date(),
  }
  const activeDay = new Date()
  const wrapper = mount(
    <ModuleEventCard event={timelineEvent} activeDay={activeDay} />
  )
  it("displays the given assessment-type details", () => {
    expect(wrapper.find(".eventPrefix").text()).toBe(timelineEvent.prefix)
    expect(wrapper.find(".unassessed").text()).toBe(timelineEvent.assessment)
  })
})
