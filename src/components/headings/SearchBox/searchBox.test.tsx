import React from "react"
import { mount } from "enzyme"
import SearchBox from "./index"
import FormControl from "react-bootstrap/FormControl"
import { BrowserRouter } from "react-router-dom"
import Header from "react-bootstrap/Dropdown"
import Item from "react-bootstrap/Dropdown"

describe("<SearchBox />", () => {
  const searchText = "Search text"
  const onSearchTextChange = jest.fn()
  const searchFilter = {
    title: "Resource Types",
    list: [
      { name: "PDF", value: "PDF" },
      { name: "video", value: "video" },
    ],
  }

  const wrapper = mount(
    <BrowserRouter>
      <SearchBox
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        prompts={[searchFilter]}
      />
    </BrowserRouter>
  )
  it("displays given search text by default", () => {
    expect(wrapper.find(FormControl).prop("value")).toBe(searchText)
  })
  // TODO investigate why this is not working
  it.skip("displays given search filters in a dropdown", () => {
    expect(wrapper.find(Header).text()).toBe(searchFilter.title)
    expect(wrapper.find(Item).length).toBe(2)
  })
  it("updates the search target on text change", () => {
    const newSearch = "New search text"
    wrapper
      .find(FormControl)
      .simulate("change", { target: { value: newSearch } })
    expect(onSearchTextChange).toHaveBeenCalledWith(newSearch)
  })
})
