import React from "react"
import { mount } from "enzyme"
import WarningJumbotron from "components/suspense/WarningJumbotron"
import FileCard from "../../../../cards/FileCard"
import FileCardsView from "./FileCardsView"
import { Feedback } from "../../../../../constants/types"

const feedbackData: Feedback[] = [
  {
    id: 1,
    year: "1920",
    course: "40003",
    course_title: "Propositional Logic",
    exercise: 1,
    exercise_title: "Simple propositions",
    group: "",
  },
  {
    id: 2,
    year: "1920",
    course: "40003",
    course_title: "Propositional Logic",
    exercise: 2,
    exercise_title: "Equivalences",
    group: "",
  },
]

describe("<FileCardsView />", () => {
  it("displays one file card per feedback resource", async () => {
    const wrapper = mount(<FileCardsView feedbackItems={feedbackData} />)
    expect(wrapper.find(FileCard).length).toBe(feedbackData.length)
  })

  it("displays error message in banner if feedback array is empty", async () => {
    const wrapper = mount(<FileCardsView feedbackItems={[]} />)
    expect(wrapper.find(WarningJumbotron).exists()).toBeTruthy()
  })
})
