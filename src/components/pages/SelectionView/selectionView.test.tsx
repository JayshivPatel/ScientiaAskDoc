import React from "react"
import { mount } from "enzyme"
import SelectionView from "./index"

describe("<SelectionView />", () => {
  const wrapper = mount(
    <SelectionView
      selectionItems={[]}
      render={jest.fn()}
      heading="Resources"
      onDownloadClick={(identifiers: number[]) => {}}
      onItemClick={(identifier: number) => {}}
    />
  )

  it("calls the render prop", () => {
    expect(wrapper.find(SelectionView).prop("render")).toBeCalled()
  })
})
