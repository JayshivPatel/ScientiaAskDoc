import React from "react"
import { mount } from "enzyme"
import SearchBox from "./index"
import FormControl from "react-bootstrap/FormControl"
import { BrowserRouter } from "react-router-dom"

describe("<Bros</SearchBox />", () => {
  const searchText = "Test SearchText"
  const onSearchTextChange = jest.fn()
  const prompts = [
    { title: "test Title", list: [{ name: "Test Name", value: "Test Value" }] },
  ]
  const wrapper = mount(
    <BrowserRouter>
      <SearchBox
        searchText={searchText}
        onSearchTextChange={onSearchTextChange}
        prompts={prompts}
      />
    </BrowserRouter>
  )
  it("Check search text", () => {
    expect(wrapper.find(FormControl).prop("value")).toBe(searchText)
  })
  it("Check text change", () => {
    const text = "Test Text"
    onSearchTextChange.mockClear()
    wrapper.find(FormControl).simulate("change", { target: { value: text } })
    expect(onSearchTextChange).toHaveBeenCalledWith(text)
  })
})
