import React from "react"
import { mount } from "enzyme"
import ResourceDetailForm from "./index"
import Form from "react-bootstrap/Form"

describe('<ResourceDetailForm />', () => {
  const wrapper = mount(
    <ResourceDetailForm
      id={0}
      tagList={[]}
      isLink={false}
      defaultTitle={""}
      titleDuplicated={jest.fn()}
      setResourceDetails={jest.fn()}
    />
  )

  it("flags when title is empty", () => {
    expect(wrapper.find(Form.Control).prop('isInvalid')).toBeTruthy()
  })
})

describe('<ResourceDetailForm />', () => {
  const wrapper = mount(
    <ResourceDetailForm
      id={0}
      tagList={[]}
      isLink={true}
      defaultTitle={"Online cheatsheet link"}
      defaultURL={""}
      titleDuplicated={jest.fn()}
      setResourceDetails={jest.fn()}
    />
  )

  it("flags when link url is empty", () => {
    const formControls = wrapper.find(Form.Control).getElements()
    const urlFormControl = formControls.find(c =>
      c.props.placeholder === 'Enter the URL')

    if (urlFormControl === undefined) {
      fail("URL form doesn't exist!")
    }

    expect(urlFormControl.props.isInvalid).toBeTruthy()
  })
})