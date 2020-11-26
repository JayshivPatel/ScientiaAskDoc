import authConstants, { AuthService } from 'constants/auth'
import { Api, methods } from 'constants/routes'
import { request } from './api'

const mockApiRoute: Api = {
  auth: AuthService.MATERIALS,
  url: 'www.some/foo/bar/url'
}

const mockResponse = {
  ok: true,
  body: 123
} as any as Response

describe('Test request api', () => {

  it('should get desired response body from a successful request', async () => {
    // const fetchCallback: jest.Mock<Promise<Response>, [RequestInfo, RequestInit | undefined]> 
    //   = jest.fn(async (a, b) => Promise.resolve(mockResponse))
    // global.fetch = fetchCallback

    // const result = await request<string>({
    //   api: mockApiRoute,
    //   method: methods.GET,
    // })

    // const fetchArgs = fetchCallback.mock.calls[0]
    // const fetchResult = fetchCallback.mock.results[0]
    // expect(fetchArgs[0]).toBe(mockApiRoute.url)
    // expect(fetchArgs[1]).toBe({
    //   method: methods.GET,
    //   mode: "cors",
    //   headers: {
    //     Authorization: authConstants.ACCESS_TOKEN_HEADER(mockApiRoute.auth)
    //   },
    // })
    // // expect(fetchResult).toBe()
    
  })
})