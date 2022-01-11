import React from "react"
import { mount } from "enzyme"
import StaffView from "./StaffView"
import CategoryHeader from "components/headings/CategoryHeader"
import EditModal from "components/modals/EditModal"
import FileItemRow from "components/rows/FileItemRow"
import UploadJumbotron from "components/suspense/UploadJumbotron"
import { Folder, Resource } from "constants/types"

const folders: Folder[] = [
  {
    title: "Lecture Notes",
    id: 0,
  },
  {
    title: "Misc",
    id: 1,
  },
]

const resources: Resource[] = [
  {
    type: "file",
    category: "Lecture Notes",
    index: 1,
    downloads: 374,
    visible_after: new Date("2019-07-19T17:33:50.773672"),
    path: "140_slides_syntax_semantics_propositionalLogic.pdf",
    course: "40003",
    title: "Propositional Logic Slides",
    id: 1,
    tags: ["Week 1", "Slides", "new"],
  },
  {
    type: "file",
    category: "Lecture Notes",
    index: 2,
    downloads: 43,
    visible_after: new Date("2019-07-19T17:33:50.773672"),
    path: "140_slides_Syntac_And_Semantics_FirstOrder_Logic.pdf",
    course: "40003",
    title: "First Order Logic Slides",
    id: 2,
    tags: ["Week 2", "Slides", "new"],
  },
  {
    type: "file",
    category: "Misc",
    index: 3,
    downloads: 59,
    visible_after: new Date("2019-07-19T17:33:50.773672"),
    path: "140_slides_Cheat_sheet.pdf",
    course: "40003",
    title: "Cheat Sheet",
    id: 3,
    tags: ["Slides", "new"],
  },
]

const onItemClickSpy = jest.fn()

describe("<StaffView />", () => {
  const wrapper = mount(
    <StaffView
      year="2021"
      course="40003"
      folders={folders}
      reload={jest.fn()}
      resources={resources}
      setResources={jest.fn()}
      onItemClick={onItemClickSpy}
      searchText=""
      includeInSearchResult={jest.fn()}
    />
  )

  it("displays the correct number of folders", () => {
    expect(wrapper.find(CategoryHeader).length).toBe(2)
  })

  it("displays the correct number of resources", () => {
    expect(wrapper.find(FileItemRow).length).toBe(3)
  })

  it("sorts tags in edit modal by alphabetical order", () => {
    const expectedTags = ["Slides", "Week 1", "Week 2"]
    expect(wrapper.find(EditModal).prop("tags")).toStrictEqual(expectedTags)
  })

  it("calls onItemClick handler when a resource is clicked", () => {
    // Click the third file
    wrapper.find(FileItemRow).at(2).simulate("click")

    expect(onItemClickSpy).toBeCalledTimes(1)
  })
})

describe("<StaffView />", () => {
  const wrapper = mount(
    <StaffView
      year="2021"
      course="40003"
      folders={folders}
      reload={jest.fn()}
      resources={[]}
      setResources={jest.fn()}
      onItemClick={jest.fn()}
      searchText=""
      includeInSearchResult={jest.fn()}
    />
  )

  it("displays upload prompt when no resources are present", () => {
    expect(wrapper.find(UploadJumbotron).exists()).toBeTruthy()
  })
})
