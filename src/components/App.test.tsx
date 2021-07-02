import React from "react"
import {render} from "@testing-library/react"
import App from "./App"

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

describe("The Scientia app", () => {
  it("Able to render the whole app with no error", () => {
    const {} = render(<App/>)
  })
})