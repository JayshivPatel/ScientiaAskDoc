import React from "react"
import { render } from "@testing-library/react"
import { shallow, configure, mount } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFileAlt, faArchive, faFileCode, faFilePowerpoint, faFileWord } from "@fortawesome/free-solid-svg-icons"
import FileExtensionIcon from "."

configure({adapter: new Adapter()})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe("renders learn react link", () => {
  it("Able to recognize file extensions", () => {
    const codeDics = [
      [["hs"], faFileCode],
      [["hs", "lhs"], faFileCode],
      [["c", "cpp"], faFileCode],
      [["rar"], faArchive],
      [["pptx"], faFilePowerpoint],
      [["docx"], faFileWord],
      [["txt"], faFileAlt],
      [[""], faFileAlt],
      [["c", "zip"], faFile],
      [[], faFile],
    ]
    const wrapper = mount(<FileExtensionIcon suffixes={[]}/>)
    for (const [suffixes, icon] of codeDics) {
      wrapper.setProps({ suffixes: suffixes }).update()
      expect(wrapper.find(FontAwesomeIcon).prop('icon')).toBe(icon)
    }
  })


})
