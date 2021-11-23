import authConstants, { AuthService, authServices } from "../constants/auth"
import { api, ApiEndpoint } from "../constants/routes"

/**
 * Store access token and user info of the given auth service.
 * @param service the authentication service (i.e. MATERIALS)
 * @param data data we wish to store
 */
function storeDataInStorage(
  service: AuthService,
  data: { access_token: string; user_info: any }
) {
  localStorage.setItem(authConstants.ACCESS_TOKEN(service), data.access_token)
  localStorage.setItem(
    authConstants.USER_INFO(service),
    JSON.stringify(data.user_info)
  )
}

/**
 * Removes data for all auth services from storage
 */
function removeDataFromStorage() {
  authServices.map((service) => {
    localStorage.removeItem(authConstants.ACCESS_TOKEN(service))
    localStorage.removeItem(authConstants.USER_INFO(service))
  })
}

/**
 * Get user info under the given auth service
 * @param service The relevant auth service
 */
function getUserInfo(service: AuthService = AuthService.MATERIALS) {
  const info = localStorage.getItem(authConstants.USER_INFO(service))
  if (info) {
    return JSON.parse(info)
  }
  return {}
}

async function login(
  username: string,
  password: string,
  login_endpoint: ApiEndpoint
) {
  const response = await fetch(login_endpoint.url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  })
  if (response.ok) {
    const data = await response.json()
    storeDataInStorage(login_endpoint.auth, {
      ...data,
      user_info: {
        username: username,
      },
    })
    return true
  }
  return false
}

const logout = () => removeDataFromStorage()

/**
 * Login to all services
 * @param username user's college username (i.e. abc123)
 * @param password user's password
 */
async function loginAll(username: string, password: string): Promise<boolean> {
  const results = await Promise.all(
    [api.MATERIALS_LOGIN, api.EMARKING_LOGIN].map((login_endpoint) =>
      login(username, password, login_endpoint)
    )
  )
  return !results.includes(false)
}

/**
 * Check if user is logged in to the given auth service
 * @param services the auth service that you wish to check user's login status on it.
 */
const userIsLoggedIn = (services: AuthService[] = [AuthService.MATERIALS]) => {
  for (const service of services) {
    if (localStorage.getItem(authConstants.ACCESS_TOKEN(service)) === null) {
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
