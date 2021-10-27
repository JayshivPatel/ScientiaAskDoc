import React, { useEffect } from "react"
import { mount } from "enzyme"
import SelectionView, { SelectionItem, SelectionProps } from "./index"

const DummyComponent: React.FC<{ select: SelectionProps }> = ({ select }) => {
  return <div />
}

const DummyComponentClickFirst: React.FC<{ select: SelectionProps }> = ({
  select,
}) => {
  useEffect(() => {
    select.handleSelectIconClick(1)
  }, [])
  return <div />
}

const selectionItems: SelectionItem[] = [
  {
    title: "Propositional Logic Slides",
    id: 1,
    type: "pdf",
  },
  {
    title: "First Order Logic Slides",
    id: 2,
    type: "pdf",
  },
  {
    title: "Link to Advanced Material",
    id: 3,
    type: "link",
  },
]

describe("<SelectionView />", () => {
  const wrapper = mount(
    <SelectionView
      selectionItems={selectionItems}
      render={jest.fn((select: SelectionProps) => (
        <DummyComponent select={select} />
      ))}
      heading="Resources"
      onDownloadClick={(identifiers: number[]) => {}}
      onItemClick={(identifier: number) => {}}
    />
  )

  it("calls the render prop with the correct selection items", () => {
    expect(wrapper.find(SelectionView).prop("render")).toBeCalled()
    expect(wrapper.find(DummyComponent).prop("select").selectionItems).toEqual(
      selectionItems
    )
  })

  it("initialises with no selected items", () => {
    expect(
      wrapper.find(DummyComponent).prop("select").isAnySelected()
    ).toBeFalsy()
  })
})

describe("<SelectionView />", () => {
  const wrapper = mount(
    <SelectionView
      selectionItems={selectionItems}
      render={jest.fn((select: SelectionProps) => (
        <DummyComponentClickFirst select={select} />
      ))}
      heading="Resources"
      onDownloadClick={(identifiers: number[]) => {}}
      onItemClick={(identifier: number) => {}}
    />
  )

  it("registers selected items", () => {
    expect(
      wrapper.find(DummyComponentClickFirst).prop("select").isAnySelected()
    ).toBeTruthy()
  })
})
