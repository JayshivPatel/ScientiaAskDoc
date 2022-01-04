import React from "react"
import { BrowserRouter as Router } from "react-router-dom"
import { mount } from "enzyme"
import ModuleFeedbackResource from "./index"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import { api } from "constants/routes"
import { RequestData } from "utils/api-types"

jest.mock("utils/api")
const apiCalling = require("utils/api")

const feedbackData = [
  {
    id: 1,
    year: "1920",
    course: "40003",
    course_title: "Propositional Logic",
    exercise: 1,
    exercise_title: "Simple propositions",
  },
  {
    id: 2,
    year: "1920",
    course: "40003",
    course_title: "Propositional Logic",
    exercise: 2,
    exercise_title: "Equivalences",
  },
]

const moduleTitle = "Introduction to Logic"
const year = "1920"
const course = "40003"
const exercise = 2

const BLOB_URL = "blob://testurl"
global.URL.createObjectURL = jest.fn(() => BLOB_URL)

describe("<ModuleFeedbackResource />", () => {
  apiCalling.request = jest.fn((data: RequestData) => {
    if (data.endpoint === api.EMARKING_FEEDBACK) data.onSuccess(feedbackData)
    else data.onSuccess(new Blob())
  })

  const wrapper = mount(
    <Router>
      <ModuleFeedbackResource
        moduleTitle={moduleTitle}
        year={year}
        course={course}
        exercise={exercise}
        showSidebars={() => {}}
        hideSidebars={() => {}}
      />
    </Router>
  )

  it("loads pdf url", async () => {
    expect(wrapper.find("iframe").prop("src")).toBe(BLOB_URL)
  })
})

describe("<ModuleFeedbackResource />", () => {
  const errorMessage = "There was an error!"
  apiCalling.request = jest.fn((data: RequestData) => {
    data.onError(errorMessage)
  })

  const wrapper = mount(
    <Router>
      <ModuleFeedbackResource
        moduleTitle={moduleTitle}
        year={year}
        course={course}
        exercise={exercise}
        showSidebars={() => {}}
        hideSidebars={() => {}}
      />
    </Router>
  )

  it("warns user on error", async () => {
    let errorPanel = wrapper.find(WarningJumbotron)
    expect(errorPanel.exists()).toBeTruthy()
    expect(errorPanel.text()).toContain(errorMessage)
  })
})
