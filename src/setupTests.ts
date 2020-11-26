// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect"
import { configure } from "enzyme";
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


/**
 * Ignore 'test was not wrapped in act(...)' warning.
 * @param realConsoleMethod 
 */
const mockConsoleMethod = (realConsoleMethod: (string: string, ...data: any[]) => void) => {
  const ignoredMessages = [
    'test was not wrapped in act(...)',
  ]

  return (message: string, ...args: any[]) => {
    const containsIgnoredMessage = ignoredMessages.some(ignoredMessage => message.includes(ignoredMessage))

    if (!containsIgnoredMessage) {
      realConsoleMethod(message, ...args)
    }
  }
}



/**
 * Ignore 'test was not wrapped in act(...)' warning. FIXME: make it work
 */
console.warn = jest.fn(mockConsoleMethod(console.warn))
console.error = jest.fn(mockConsoleMethod(console.error))