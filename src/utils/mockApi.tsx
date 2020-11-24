import { AuthService } from "constants/auth";
import { Api } from "constants/routes";
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

/**
 * mock API interface, for hijacking and testing api calls in each component.
 */
const mockAPI = {

  /**
   * Mock request api call.
   * The real 'request' function will call this function when testing.
   * You should NOT call this function specifically elsewhere.
   * @param input request data for the mock api call.
   */
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

  /**
   * Insert a mock data into the mock data dictionary, so that it can be
   * used in later testing.
   * The way to use this function:
   *    onNextCallTo(someApi).withMethod(someMethod).willReturn(someResponse, 204)
   * @param api Api for the request (defined in constants/routes.tsx)
   */
  onNextCallTo(api: Api) {
    return {
      /**
       * @param method Method for this request
       */
      withMethod(method: string) {
        return {
          /**
           * Declare that the mock api call will respond successfully.
           * @param response The response object
           * @param statusCode The status code (default = 200). This should be a successful status code (2xx)
           */
          willReturn(response: any = undefined, statusCode: number = 200) {
            mockReturnDict.push([{ api, method }, { statusCode: statusCode, body: response }])
          },
        
          /**
           * Declare that the mock api call will fail.
           * @param statusCode The erroneous status code (default = 404). This should be a failed status code.
           */
          willFail(statusCode: number = 404) {
            mockReturnDict.push([{ api, method }, { statusCode: statusCode }])
          }
        }
      },
    }
  },

  /**
   * [DEPRECATED]: This function simulates the behaviour of the deprecated 'oldRequest' api.
   * Insert a mock data into the mock data dictionary, so that it can be
   * used in later testing.
   * The way to use this function:
   *    onNextOldRequestTo(someApi).willReturn(someResponse, 204)
   * @param url URL for the request
   */
  onNextOldRequestTo(url: string) {
    return this.onNextCallTo({ url: url, auth: AuthService.MATERIALS })
  },
  
  /**
   * Clear the test cache. Recommended to call this function after each test to gain better performance.
   */
  clearTestCache() {
    mockReturnDict.splice(0, mockReturnDict.length)
  }
}

export default mockAPI