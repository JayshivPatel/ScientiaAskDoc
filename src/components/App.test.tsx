import React from "react"
import { render } from "@testing-library/react"
import { shallow, configure, mount } from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import App from "./App"
import FileExtensionIcon from "./atoms/FileExtensionIcon"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFile, faFileCode } from "@fortawesome/free-solid-svg-icons"

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
  it("Able to render the whole app with no error", () => {
    const {} = render(<App/>)
  })


})
