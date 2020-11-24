import { Api, api, methods } from "constants/routes";
import { RequestData } from "./api"

interface MockRequest {
  api: Api,
  method: string,
}

interface MockResponse {
  statusCode: number,
  body?: any
}

const mockReturnDict: [MockRequest, MockResponse][] = []

const mockAPI = {
  request<Response>(input: RequestData): Promise<Response> {
    let response = undefined
    for (const [{ api, method }, res] of mockReturnDict) {
      if (input.api === api && input.method === method) {
        response = res
        break
      }
    }
  
    if (response) {
      if (response.statusCode >= 200 && response.statusCode < 300) {
        return Promise.resolve(response.body)
      }
      return Promise.reject(response.statusCode)
    }
    throw new Error("Not set mock response")
  },
  
  onNextCallTo(api: Api) {
    return {
      withMethod(method: string) {
        return {
          willReturn(response: any = undefined, statusCode: number = 200) {
            mockReturnDict.push([{ api, method }, { statusCode: statusCode, body: response }])
          },
        
          willFail(statusCode: number = 404) {
            mockReturnDict.push([{ api, method }, { statusCode: statusCode }])
          }
        }
      }
    }
  },
  
  clearTestCache() {
    mockReturnDict.length = 0
  }
}

export default mockAPI