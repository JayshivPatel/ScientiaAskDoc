import React from "react"
import { mount, shallow } from "enzyme"
import IconButton from "./index"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

describe("<IconButton />", () => {
  const tooltip = "Test Tooltip"
  const onClick = jest.fn()
  const icon = faFileCode
  const wrapper = mount(
    <IconButton tooltip={tooltip} onClick={onClick} icon={icon} />
  )
  it("Check tooltip", () => {
    const overlay = wrapper.find(OverlayTrigger).prop("overlay")
    expect(shallow(<div>{overlay}</div>).text()).toBe(tooltip)
  })
  it("Check button onClick", () => {
    wrapper.simulate("click")
    expect(onClick).toHaveBeenCalled()
  })
  it("Check icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon)
  })
})
