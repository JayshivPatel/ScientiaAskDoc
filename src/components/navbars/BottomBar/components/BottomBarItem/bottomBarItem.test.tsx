import React from "react"
import { mount } from "enzyme"
import { faFileCode } from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter } from "react-router-dom"
import BottomBarItem from "./index"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Button from "react-bootstrap/Button"

describe("<BottomBarItem />", () => {
  const page = { name: "Page name", path: "Page URL", icon: faFileCode }
  const wrapper = mount(
    <BrowserRouter>
      <BottomBarItem page={page} />
    </BrowserRouter>
  )
  it("displays a button to the given page", () => {
    expect(wrapper.find(Button).prop("id")).toBe(`bottom-${page.name}`)
    expect(wrapper.find(Button).prop("to")).toBe(page.path)
  })
  it("shows page's icon", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(page.icon)
  })
})
