/**
 * Testing local storage here, use mock storages to replace global.sessionStorage
 */
import authConstants, { AuthService } from 'constants/auth'
import { PersonInfo } from 'constants/types'
import 'mock-local-storage'
import authenticationService from './auth'

const mockToken = "123123321"

const mockPersonInfo: PersonInfo = {
  name: "Branden Ritter",
  email: "branden.ritter20@imperial.ac.uk",
  id: "BR819",
  cid: "01343896",
  dep: "Department of Computing",
  extra: {
    kind: 'staff',
    title: 'Lecturer'
  }
}

const username = "abc123"
const password = "password"
const loginService = AuthService.EMARKING
const loginURL = 'www.foo.bar.com/some/auth/url'

describe("Test function 'login'", () => {
  it('should store correct value into sessionStorage', async () => {
    const accessToken = 'accessToken123'
    const mockOtherData = "Susan Jackson"
    const returnData = { access_token: accessToken, other_data: mockOtherData }
    global.fetch = jest.fn(async (): Promise<Response> => {
      return {
        ok: true,
        json: () => Promise.resolve(returnData)
      } as Response
    })
    const result = await authenticationService.login(username, password, loginURL, loginService)
    expect(result).toBe(true)
    expect(sessionStorage.getItem(authConstants.ACCESS_TOKEN(loginService))).toBe(accessToken)
    expect(sessionStorage.getItem(authConstants.USER_INFO(loginService)))
      .toBe(JSON.stringify({ username: username }))
  })

  it('should return false and leave sessionStorage untouched when login error', async () => {
    global.fetch = jest.fn(async (): Promise<Response> => {
      return {
        ok: false,
      } as Response
    })
    const result = await authenticationService.login(username, password, loginURL, loginService)
    expect(result).toBe(false)
  })
})

