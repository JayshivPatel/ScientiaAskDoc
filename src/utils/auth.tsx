import { api } from "constants/routes"
import authConstants, { AuthService, authServices } from "../constants/auth"

/**
 * Store access token and user info of the given auth service.
 * @param service the authentication service (i.e. MATERIALS)
 * @param data data we wish to store
 */
function storeDataInStorage(service: AuthService, data: { access_token: string; user_info: any }) {
  sessionStorage.setItem(authConstants.ACCESS_TOKEN(service), data.access_token)
  sessionStorage.setItem(
    authConstants.USER_INFO(service),
    JSON.stringify(data.user_info)
  )
}

/**
 * Removes data for all auth services from storage
 */
function removeDataFromStorage() {
  authServices.map(service => {
    sessionStorage.removeItem(authConstants.ACCESS_TOKEN(service))
    sessionStorage.removeItem(authConstants.USER_INFO(service))
  })

}

/**
 * Get user info under the given auth service
 * @param service The relevant auth service
 */
function getUserInfo(service: AuthService = AuthService.MATERIALS) {
  const info = sessionStorage.getItem(authConstants.USER_INFO(service))
  if (info) {
    return JSON.parse(info)
  }
  return {}
}

/**
 * Login API calling interface. Fetch from the login url of the given login service, then
 * store relevant data into the storage.
 * @param username user's college username (i.e. abc123)
 * @param password user's password
 * @param loginURL Login url which the login request will be posted to
 * @param loginService Name of the service that is trying to login (i.e. emarking)
 */
async function login(username: string, password: string, loginURL: string, loginService: AuthService) {
  const response = await fetch(loginURL, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ username, password }),
  })
  if (response.ok) {
    const data = await response.json()
    console.log(loginService, data)
    storeDataInStorage(loginService, {
      ...data,
      user_info: {
        username: username,
      },
    })
    return true
  }
  return false
}

/**
 * Login to all services
 * @param username user's college username (i.e. abc123)
 * @param password user's password
 */
async function loginAll(username: string, password: string): Promise<boolean> {
  const results = await Promise.all(
    [api.EMARKING_LOGIN(), api.MATERIALS_LOGIN()]
      .map(({ auth, url }) => login(username, password, url, auth))
  )
  return !results.includes(false)
}

const logout = () => removeDataFromStorage()

/**
 * Check if user is logged in to the given auth service
 * @param services the auth service that you wish to check user's login status on it.
 */
const userIsLoggedIn = (services: AuthService[] = [AuthService.MATERIALS]) => {
  for (const service of services) {
    if (sessionStorage.getItem(authConstants.ACCESS_TOKEN(service)) === null) {
      return false
    }
  }
  return true
}

export default {
  login,
  loginAll,
  logout,
  userIsLoggedIn,
  getUserInfo,
}
