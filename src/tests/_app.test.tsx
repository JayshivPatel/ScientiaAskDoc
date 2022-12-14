import { render } from '@testing-library/react'
import React from 'react'

import App from '../pages/_app'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// TODO: find out why official recommendation does not work out of the box
test.skip('renders without errors', () => {
  render(<App />)
})
