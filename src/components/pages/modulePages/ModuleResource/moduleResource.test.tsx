import React from "react"
import { mount } from "enzyme"
import ModuleResource from "./index"
import { api } from "constants/routes"
import { RequestData } from "utils/api-types"

jest.mock('utils/api')
const apiCalling = require('utils/api')

const resourceData = [
  {
    "type": "file",
    "year": "1920",
    "category": "Lecture Notes",
    "index": 1,
    "downloads": 374,
    "visible_after": "2019-07-19T17:33:50.773672",
    "path": "140_slides_syntax_semantics_propositionalLogic.pdf",
    "course": "40003",
    "title": "Propositional Logic Slides",
    "id": 1,
    "tags": [
      "Week 1",
      "Slides",
      "new"
    ]
  },
  {
    "type": "file",
    "year": "1920",
    "category": "Lecture Notes",
    "index": 2,
    "downloads": 43,
    "visible_after": "2019-07-19T17:33:50.773672",
    "path": "140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf",
    "course": "40003",
    "title": "First Order Logic Slides",
    "id": 2,
    "tags": [
      "Week 2",
      "Slides",
      "new"
    ]
  },
] 

global.URL.createObjectURL = jest.fn(() => 'blob://testurl');

apiCalling.request = jest.fn((data: RequestData) => {
  if (data.url === api.MATERIALS_RESOURCES) {
    data.onSuccess(resourceData)
  } else {
    data.onSuccess(new Blob())
  }
})

describe("<ModuleResource />", () => {
  const year = "1920"
  const course = "40003"
  const category = "Lecture Notes"
  const index = 2


  const wrapper = mount(
      <ModuleResource
        year={year}
        course={course}
        category={category}
        index={index}
      />
  )

  it("loads pdf url", async () => {
    expect(wrapper.find("iframe").prop("src")).toBe("blob://testurl")
  })
})