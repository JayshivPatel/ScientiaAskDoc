import React from "react"
import { mount } from "enzyme"
import Button from "react-bootstrap/Button"
import { BrowserRouter as Router } from "react-router-dom"
import ModuleRow from "./index"
import styles from "./style.module.scss"
import { Module, ProgressStatus } from "../../../constants/types"

describe("<ModuleCard />", () => {
  const module: Module = {
    title: "Test Title",
    code: "CO60050",
    terms: ["Autumn"],
    has_materials: false,
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 50,
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
  it("uses special border style if flag has_materials is set to false", () => {
    expect(wrapper.find(Button).getDOMNode()).toHaveClass(styles.noMaterials)
  })
})
