import authConstants, { AuthService, authServices } from "../constants/auth"
import { api, ApiEndpoint } from "../constants/routes"
import { jwtHasNotExpired } from "./jwt"

/**
 * Store access token and user info of the given auth service.
 * @param service the authentication service (i.e. MATERIALS)
 * @param data data we wish to store
 */
function storeDataInStorage(
  service: AuthService,
  data: { access_token: string; refresh_token?: string }
) {
  localStorage.setItem(authConstants.ACCESS_TOKEN(service), data.access_token)
  if (data.refresh_token) {
    localStorage.setItem(
      authConstants.REFRESH_TOKEN(service),
      data.refresh_token
    )
  }
}

/**
 * Removes data for all auth services from storage
 */
function removeDataFromStorage() {
  authServices.map((service) => {
    localStorage.removeItem(authConstants.ACCESS_TOKEN(service))
    localStorage.removeItem(authConstants.REFRESH_TOKEN(service))
  })
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
    })
  }
  return response.ok
}

const logout = () => removeDataFromStorage()

async function refresh(refresh_endpoint: ApiEndpoint) {
  const refresh_auth_header = authConstants.REFRESH_TOKEN_HEADER(
    refresh_endpoint.auth
  )
  const response = await fetch(refresh_endpoint.url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: refresh_auth_header,
    },
  })
  if (response.ok) {
    const data = await response.json()
    storeDataInStorage(refresh_endpoint.auth, {
      ...data,
    })
  }
  return response.ok
}

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
 * Check if user is logged in to Scientia by seeing if they hold a refresh
 * token with the Materials API
 */
const userIsLoggedIn = (): boolean => {
  const materialsService = AuthService.MATERIALS
  const refreshTokenKey = authConstants.REFRESH_TOKEN(materialsService)
  const jwt = localStorage.getItem(refreshTokenKey)
  return jwt != null && jwtHasNotExpired(jwt)
}

/**
 * Check if user has access via an access token to the given auth service
 * @param services the auth service that you wish to check user's login status
 * on it.
 */
const userHasAccess = (service: AuthService): boolean => {
  const accessTokenKey = authConstants.ACCESS_TOKEN(service)
  const jwt = localStorage.getItem(accessTokenKey)
  return jwt != null && jwtHasNotExpired(jwt)
}

export default {
  login,
  loginAll,
  logout,
  refresh,
  userIsLoggedIn,
  userHasAccess,
}
