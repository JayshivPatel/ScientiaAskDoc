import React from "react"
import { mount } from "enzyme"
import Button from "react-bootstrap/Button"
import { BrowserRouter as Router } from "react-router-dom"
import ModuleRow from "./index"
import styles from "./style.module.scss"
import { Module } from "constants/types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

describe("<ModuleRow />", () => {
  const module: Module = {
    title: "Test Title",
    code: "CO60050",
    terms: ["Autumn"],
    has_materials: false,
    content: "Test Content",
    subscriptionLevel: 1,
  }
  const wrapper = mount(
    <Router>
      <ModuleRow module={module} />
    </Router>
  )
  it("displays module title", () => {
    expect(wrapper.find("#title").text()).toBe(module.title)
  })
  it("uses glowing yellow dot if flag has_materials is set to false", () => {
    expect(wrapper.find(FontAwesomeIcon).getDOMNode()).toHaveClass(
      styles.noMaterials
    )
  })
})
