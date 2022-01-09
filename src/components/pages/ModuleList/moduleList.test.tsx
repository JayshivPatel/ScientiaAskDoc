import React from "react"
import { mount } from "enzyme"
import { BrowserRouter as Router } from "react-router-dom"
import ModuleList from "./index"
import ModuleRow from "components/rows/ModuleRow"
import { Module } from "constants/types"

describe("<ModuleList />", () => {
  const modules: Module[] = [
    {
      title: "Reasoning About Programs",
      code: "40006",
      terms: ["Autumn"],
      has_materials: false,
      content: "Test Content",
      subscriptionLevel: 1,
    },
    {
      title: "Discrete Structures",
      code: "40004",
      terms: ["Autumn"],
      has_materials: false,
      content: "Test Content",
      subscriptionLevel: 1,
    },
    {
      title: "Graphs and Algorithms",
      code: "40008",
      terms: ["Autumn"],
      has_materials: false,
      content: "Test Content",
      subscriptionLevel: 1,
    },
  ]

  const wrapper = mount(
    <Router>
      <ModuleList modules={modules} year={"2122"} />
    </Router>
  )

  it("sorts modules by module code", () => {
    const expectedModuleCodes = ["40004", "40006", "40008"]
    const actualModuleCodes = wrapper
      .find(ModuleRow)
      .map((reactWrapper) => reactWrapper.prop("module"))
      .map((module) => module.code)

    expect(actualModuleCodes).toStrictEqual(expectedModuleCodes)
  })
})
