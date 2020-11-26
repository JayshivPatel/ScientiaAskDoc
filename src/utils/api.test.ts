import authConstants, { AuthService } from 'constants/auth'
import { Api, methods } from 'constants/routes'
import { download, request, requestBlob } from './api'

(request as jest.Mock).mockRestore()

const mockApiRoute: Api = {
  auth: AuthService.MATERIALS,
  url: 'www.some/foo/bar/url'
}

const mockResponseData = {
  name: 'Susan Jackson',
  year: '2021'
}

const mockResponse = {
  ok: true,
  text: () => JSON.stringify(mockResponseData)
} as any as Response

describe('Test request api', () => {

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should get desired response body from a successful request', async () => {
    const fetchCallback: jest.Mock<Promise<Response>, [RequestInfo, RequestInit | undefined]> 
      = jest.fn(async (a, b) => Promise.resolve(mockResponse))
    global.fetch = fetchCallback

    const result = await request<string>({
      api: mockApiRoute,
      method: methods.GET,
    })

    const fetchArgs = fetchCallback.mock.calls[0]
    expect(fetchArgs[0]).toBe(mockApiRoute.url)
    expect(fetchArgs[1]).toStrictEqual({
      method: methods.GET,
      mode: "cors",
      headers: {
        "Authorization": authConstants.ACCESS_TOKEN_HEADER(mockApiRoute.auth),
        "Content-Type": "application/json"
      },
    })
    expect(result).toStrictEqual(mockResponseData)
  })

  it('should return undefined when text is not parsable', async () => {
    const fetchCallback: jest.Mock<Promise<Response>, [RequestInfo, RequestInit | undefined]> 
      = jest.fn(async (a, b) => Promise.resolve({ ok: true, text: () => undefined } as any as Response))
    global.fetch = fetchCallback

    const result = await request<string>({
      api: mockApiRoute,
      method: methods.GET,
    })
    expect(result).toBe(undefined)
  })

  it('should reject promise on rejected fetch', async () => {
    const fetchCallback: jest.Mock
      = jest.fn(async (a, b) => {
        throw 'Connection dropped'
      })
    global.fetch = fetchCallback

    await expect(request<string>({
      api: mockApiRoute,
      method: methods.GET,
    })).rejects.toBe('Connection dropped')
  })
  
  it('should reject promise when response is not ok and throws the response object if it is parsable', async () => {
    const notOkResponse = { ok: false, reason: 'I am angry!', some: 123 }
    const fetchCallback: jest.Mock
      = jest.fn(async (a, b) => notOkResponse)
    global.fetch = fetchCallback

    await expect(request<string>({
      api: mockApiRoute,
      method: methods.GET,
    })).rejects.toStrictEqual(notOkResponse)
  })
})

describe('Test requestBlob api', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const blob = new Blob()
  it('should return the correct blob object', async () => {
    const fetchCallback: jest.Mock
      = jest.fn(async (a, b) => ({ ok: true, blob: () => blob }))
    global.fetch = fetchCallback

    const result = await requestBlob({
      api: mockApiRoute,
      method: methods.GET,
    })

    const fetchArgs = fetchCallback.mock.calls[0]
    expect(fetchArgs[0]).toBe(mockApiRoute.url)
    expect(fetchArgs[1]).toStrictEqual({
      method: methods.GET,
      mode: "cors",
      headers: {
        "Authorization": authConstants.ACCESS_TOKEN_HEADER(mockApiRoute.auth),
        "Content-Type": "application/json"
      },
    })
    expect(Object.is(result, blob))
  })
})

describe('Test download api', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  const blob = new Blob()
  const filename = 'foobar.pdf'
  const url = 'some/url'
  global.URL.createObjectURL = jest.fn()


  it('should download and display the correct blob object', async () => {
    // const fetchCallback: jest.Mock
    //   = jest.fn(async (a, b) => ({ ok: true, blob: () => blob }))
    // global.fetch = fetchCallback

    // const urlMock = jest.fn(blob => url)
    // global.URL.createObjectURL = urlMock
    
    // await download(mockApiRoute, filename)
    // expect(urlMock).toHaveBeenCalledTimes(1)
    // expect(urlMock.mock.results[0].value).toBe(url)

  })

})