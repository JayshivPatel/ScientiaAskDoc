import React from "react"
import { mount } from "enzyme"
import SideBarFilterGroup from "./index"
import SideBarTabGroup from "../SideBarTabGroup"
import Button from "react-bootstrap/Button"

describe("<SideBarFilterGrou />", () => {
  const setModulesFilter = jest.fn()
  const modulesFilter = ""
  const wrapper = mount(
    <SideBarFilterGroup
      setModulesFilter={setModulesFilter}
      modulesFilter={modulesFilter}
    />
  )
  it("renders as a single <SideBarTabGroup/> with title 'Filter'", () => {
    expect(wrapper.find(SideBarTabGroup)).toHaveLength(1)
    expect(wrapper.find(SideBarTabGroup).prop("title")).toBe("Filter")
  })
  it("displays four filter buttons", () => {
    expect(wrapper.find(SideBarTabGroup).prop("buttons").length).toBe(4)
    expect(
      wrapper
        .find(SideBarTabGroup)
        .prop("buttons")
        .map((b) => b.title)
    ).toEqual(["All", "In Progress", "Not Started", "Completed"])
  })
  it("triggers the modules filter whenever one of the filter buttons is called", () => {
    setModulesFilter.mockClear()
    wrapper.find(Button).at(0).simulate("click")
    expect(setModulesFilter).toHaveBeenCalledTimes(1)
    wrapper.find(Button).at(1).simulate("click")
    expect(setModulesFilter).toHaveBeenCalledTimes(2)
    wrapper.find(Button).at(2).simulate("click")
    expect(setModulesFilter).toHaveBeenCalledTimes(3)
    wrapper.find(Button).at(3).simulate("click")
    expect(setModulesFilter).toHaveBeenCalledTimes(4)
  })
})
