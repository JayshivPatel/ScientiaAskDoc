import { api, methods } from "constants/routes";
import { RequestData } from "./api"


function mockAPI<Response>(input: RequestData): Promise<Response> {
  const response = mockReturnDict.get(input)
  if (response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return Promise.resolve(response.body)
    }
    return Promise.reject(response.statusCode)
  }
  throw new Error("Not set mock response")
}

interface MockResponse {
  statusCode: number,
  body?: any
}

const mockReturnDict: Map<RequestData, MockResponse> = new Map();

export const onNextCallTo = (input: RequestData) => ({
  willReturn(response: any = undefined, statusCode: number = 200) {
    mockReturnDict.set(input, { statusCode: statusCode, body: response })
  },

  willFail(statusCode: number = 404) {
    mockReturnDict.set(input, { statusCode: statusCode })
  }
})

export default mockAPI