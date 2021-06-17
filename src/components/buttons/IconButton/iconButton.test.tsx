import React from "react"
import { mount, shallow } from "enzyme"
import IconButton from "./index"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import OverlayTrigger from "react-bootstrap/OverlayTrigger"

describe("<IconButton />", () => {
  const tooltip = "A tooltip"
  const onClick = jest.fn()
  const icon = faFileCode
  const wrapper = mount(
    <IconButton tooltip={tooltip} onClick={onClick} icon={icon} />
  )
  it("is passed a tooltip prop and displays it in overlay", () => {
    const overlay = wrapper.find(OverlayTrigger).prop("overlay")
    expect(shallow(<div>{overlay}</div>).text()).toBe(tooltip)
  })
  it("handles click events with the onClick prop", () => {
    wrapper.simulate("click")
    expect(onClick).toHaveBeenCalled()
  })
  it("displays the icon it receives in the props", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(icon)
  })
})
