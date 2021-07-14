import React from "react"
import { mount } from "enzyme"
import SideBarCard, {
  eventTypes,
  SideBarCardProps,
} from "../../cards/SideBarCard"
import SideBarCardGroup from "./index"

describe("<SideBarCardGroup />", () => {
  const events: SideBarCardProps[] = [
    { id: 1, type: eventTypes.BlueCard },
    { id: 2, type: eventTypes.BlueCard },
  ]
  const title = "Test Title"
  const onCardClick = jest.fn()
  const wrapper = mount(
    <SideBarCardGroup events={events} title={title} onCardClick={onCardClick} />
  )
  it("Check events", () => {
    expect(wrapper.find(SideBarCard).length).toBe(2)
  })
  it("Check title", () => {
    expect(wrapper.find(".sideBarCardGroupHeading").text()).toBe(title)
  })
  it("Check car onClick", () => {
    onCardClick.mockClear()
    wrapper.find(SideBarCard).at(0).simulate("click")
    expect(onCardClick).toHaveBeenCalledTimes(1)
    wrapper.find(SideBarCard).at(1).simulate("click")
    expect(onCardClick).toHaveBeenCalledTimes(2)
  })
})
