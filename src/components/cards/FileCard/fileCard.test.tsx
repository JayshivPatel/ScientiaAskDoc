import React from "react"
import { mount } from "enzyme"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Card from "react-bootstrap/Card"
import FileCard from "./index"
import Badge from "react-bootstrap/Badge"

describe("<FileCard />", () => {
  const title = "Card title"
  const type = ""
  const tags = ["Tag A", "Tag B"]
  const [tagA, tagB] = tags
  const icon = faFileCode
  const onIconClick = jest.fn()
  const onClick = jest.fn()
  const onMouseOver = jest.fn()
  const onMouseOut = jest.fn()
  const wrapper = mount(
    <FileCard
      title={title}
      type={type}
      tags={tags}
      icon={icon}
      onIconClick={onIconClick}
      onClick={onClick}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    />
  )
  it("displays given title", () => {
    expect(wrapper.find(Card.Title).text()).toBe(title)
  })
  it("presents given tags as badges", () => {
    expect(wrapper.find(Badge).at(0).text()).toBe(tagA)
    expect(wrapper.find(Badge).at(1).text()).toBe(tagB)
  })
  it("displays the icon it receives in the props", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon)
  })
  it("triggers onIconClick after click event on icon", () => {
    onIconClick.mockClear()
    onClick.mockClear()
    wrapper.find(FontAwesomeIcon).simulate("click")
    expect(onIconClick).toHaveBeenCalled()
    expect(onClick).not.toHaveBeenCalled()
  })
  it("triggers onClick after click event on card", () => {
    onIconClick.mockClear()
    onClick.mockClear()
    wrapper.simulate("click")
    expect(onClick).toHaveBeenCalled()
    expect(onIconClick).not.toHaveBeenCalled()
  })
  it("supports mouse-over event", () => {
    wrapper.simulate("mouseover")
    expect(onMouseOver).toHaveBeenCalled()
  })
  it("supports mouse-out event", () => {
    wrapper.simulate("mouseout")
    expect(onMouseOut).toHaveBeenCalled()
  })
})
