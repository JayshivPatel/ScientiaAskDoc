import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../pages/_app'

/* TODO: Mock call to matchMedia to avoid failing test */
test('renders learn react link', () => {
  render(<App />)
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})