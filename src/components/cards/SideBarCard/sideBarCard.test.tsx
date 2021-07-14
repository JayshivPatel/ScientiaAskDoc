import React from "react"
import {mount} from "enzyme"
import SideBarCard, {eventTypes} from "./index"
import Card from "react-bootstrap/Card"

describe("<SideBardCard />", () => {
  const type = eventTypes.BlueCard
  const onClick = jest.fn()
  const wrapper = mount(<SideBarCard type={type} onClick={onClick} />)
  it("is populated with the right colour class", () => {
    expect(wrapper.find(Card).hasClass("sideBarBlueCard")).toBeTruthy()
    expect(wrapper.find(Card).hasClass("sideBarRedCard")).toBeFalsy()
    expect(wrapper.find(Card).hasClass("sideBarGreenCard")).toBeFalsy()
    expect(wrapper.find(Card).hasClass("sideBarIndigoCard")).toBeFalsy()
    expect(wrapper.find(Card).hasClass("sideBarCyanCard")).toBeFalsy()
  })
  it("displays title only if one is given", () => {
    expect(wrapper.contains(<Card.Title />)).toBeFalsy()
    const title = "Event title"
    wrapper.setProps({ title: title }).update()
    expect(wrapper.find(Card.Title).text()).toBe(title)
  })
  it("is treated as an empty card if no subtitle is provided", () => {
    expect(wrapper.contains(<Card.Subtitle />)).toBeFalsy()
    expect(wrapper.find(Card).hasClass("sideBarEmptyCard")).toBeTruthy()
  })
  it("displays subtitle only if one is given", () => {
    const subtitle = "Event subtitle"
    wrapper.setProps({ subtitle: subtitle }).update()
    expect(wrapper.find(Card.Subtitle).text()).toBe(subtitle)
  })
  it("correctly triggers the given onClick() when clicked", () => {
    onClick.mockClear()
    wrapper.find(Card).simulate("click")
    expect(onClick).toHaveBeenCalled()
  })
})
