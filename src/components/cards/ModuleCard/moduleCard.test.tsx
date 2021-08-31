import React from "react"
import { mount } from "enzyme"
import { Module, ProgressStatus } from "../../../constants/types"
import ModuleCard from "./index"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCanadianMapleLeaf } from "@fortawesome/free-brands-svg-icons"
import { BrowserRouter as Router } from "react-router-dom"

describe("<ModuleCard />", () => {
  const module: Module = {
    title: "Test Title",
    code: "CO60050",
    terms: ["Autumn"],
    progressStatus: ProgressStatus.IN_PROGRESS,
    progressPercent: 50,
    content: "Test Content",
    subscriptionLevel: 1,
  }
  const wrapper = mount(
    <Router>
      <ModuleCard module={module} />
    </Router>
  )
  it("displays module title", () => {
    expect(wrapper.find(Card.Title).text()).toBe(module.title)
  })
  it.skip("displays autumn icon for autumn term", () => {
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(faCanadianMapleLeaf)
  })
  it("uses 'danger' border style if flag hasMaterials is set to false", () => {
    expect(wrapper.find(Card).prop("border")).toBe("danger")
  })
})
