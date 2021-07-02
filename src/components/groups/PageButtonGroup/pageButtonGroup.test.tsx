import React from "react"
import { mount } from "enzyme"
import { faFileCode, IconDefinition } from "@fortawesome/free-solid-svg-icons"
import PageButtonGroup from "./index"
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

describe("<PageButtonGroup />", () => {
  const buttons: {
    title: string
    icon: IconDefinition
    url: string
  }[] = [{ title: "Button1 Title", icon: faFileCode, url: "Button1 URL" }]
  const wrapper = mount(<PageButtonGroup buttons={buttons} />)
  it("sets up a button according to the given attributes", () => {
    expect(wrapper.find(Button).text()).toBe(buttons[0].title)
    expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe(buttons[0].icon)
    expect(wrapper.find(Button).prop("href")).toBe(buttons[0].url)
  })
})
