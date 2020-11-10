import authConstants, { AuthService, authServices } from "../constants/auth"

function storeDataInStorage(service: AuthService, data: { access_token: string; user_info: any }) {
  sessionStorage.setItem(authConstants.ACCESS_TOKEN(service), data.access_token)
  sessionStorage.setItem(
    authConstants.USER_INFO(service),
    JSON.stringify(data.user_info)
  )
}

function removeDataFromStorage() {
  authServices.map(service => {
    sessionStorage.removeItem(authConstants.ACCESS_TOKEN(service))
    sessionStorage.removeItem(authConstants.USER_INFO(service))
  })

}

function getUserInfo(service: AuthService = AuthService.MATERIALS) {
  const info = sessionStorage.getItem(authConstants.USER_INFO(service))
  if (info) {
    return JSON.parse(info)
  }
  return {}
}

async function login(username: string, password: string, login_url: string, loginService: AuthService) {
  const response = await fetch(login_url, {
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
    console.log(data)
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

const logout = () => removeDataFromStorage()
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
  logout,
  userIsLoggedIn,
  getUserInfo,
}
