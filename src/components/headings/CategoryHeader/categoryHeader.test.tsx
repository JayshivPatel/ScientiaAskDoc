import React from "react"
import { mount } from "enzyme"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import CategoryHeader from "./index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

describe("<Category Header/>", () => {
  const heading = "Header text"
  const selectAllIcon = faFileCode
  const onSelectAllClick = jest.fn()
  const wrapper = mount(
    <CategoryHeader
      heading={heading}
      selectAllIcon={selectAllIcon}
      onSelectAllClick={onSelectAllClick}
    />
  )
  it("displays given header text and icon for the select-all action", () => {
    expect(wrapper.find(".sectionHeader").text()).toBe(heading)
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(selectAllIcon)
  })
  it("triggers given onSelectAllClick when hear is clicked", () => {
    wrapper.find(".sectionHeaderContainer").simulate("click")
    expect(onSelectAllClick).toHaveBeenCalled()
  })
})
