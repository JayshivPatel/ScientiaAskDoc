import React from "react"
import { mount } from "enzyme"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import FolderCard from "./index"

describe("<FolderCard />", () => {
  const title = "Folder Title"
  const icon = faFileCode
  const onIconClick = jest.fn()
  const onClick = jest.fn()
  const onMouseOver = jest.fn()
  const onMouseOut = jest.fn()
  const wrapper = mount(
    <FolderCard
      title={title}
      icon={icon}
      onIconClick={onIconClick}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  )
  it("displays folder title", () => {
    expect(wrapper.text()).toBe(title)
  })

  it("displays given icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon)
  })
  it("only triggers onIconClick when clicking on the icon", () => {
    onIconClick.mockClear()
    onClick.mockClear()
    wrapper.find(FontAwesomeIcon).simulate("click")
    expect(onIconClick).toHaveBeenCalled()
    expect(onClick).not.toHaveBeenCalled()
  })
  it("only triggers the card's onClick when clicking on the wider card area", () => {
    onIconClick.mockClear()
    onClick.mockClear()
    wrapper.simulate("click")
    expect(onClick).toHaveBeenCalled()
    expect(onIconClick).not.toHaveBeenCalled()
  })
  it("triggers onMouseOver as expected", () => {
    wrapper.simulate("mouseover")
    expect(onMouseOver).toHaveBeenCalled()
  })
  it("triggers onMouseOut as expected", () => {
    wrapper.simulate("mouseout")
    expect(onMouseOut).toHaveBeenCalled()
  })
})
