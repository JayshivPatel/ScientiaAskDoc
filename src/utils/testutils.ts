/**
 * Ignore 'test was not wrapped in act(...)' warning.
 * @param realConsoleMethod 
 */
export const mockConsoleMethod = (realConsoleMethod: (string: string, ...data: any[]) => void) => {
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

type ConsoleMethod = {
  (...data: any[]): void;
  (message?: any, ...optionalParams: any[]): void;
}

export const setIgnoreActWarning = () => {
  const warn = console.warn
  const error = console.error
  console.warn = jest.fn(mockConsoleMethod(console.warn))
  console.error = jest.fn(mockConsoleMethod(console.error))
  return { warn, error }
}

export const restoreConsoleMethods = (methods: { warn: ConsoleMethod, error: ConsoleMethod }) => {
  console.warn = methods.warn
  console.error = methods.error
}