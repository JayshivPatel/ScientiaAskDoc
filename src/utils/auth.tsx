import authConstants from "../constants/auth";

function storeDataInStorage(data: { access_token: string; user_info: any; }) {
  sessionStorage.setItem(authConstants.ACCESS_TOKEN, data.access_token);
  sessionStorage.setItem(
    authConstants.USER_INFO,
    JSON.stringify(data.user_info)
  );
}

function removeDataFromStorage() {
  sessionStorage.removeItem(authConstants.ACCESS_TOKEN);
  sessionStorage.removeItem(authConstants.USER_INFO);
}

function getUserInfo() {
  const info = sessionStorage.getItem(authConstants.USER_INFO)
  if (info) {
    return JSON.parse(info)
  }
  return {}
}

async function login(username: string, password: string, login_url: string) {
  const response = await fetch(login_url, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({ username, password })
  });
  if (response.ok) {
    const data = await response.json();
    storeDataInStorage(data);
    return true;
  }
  return false;
}

const logout = () => removeDataFromStorage();
const userIsLoggedIn = () => {
  return sessionStorage.getItem(authConstants.ACCESS_TOKEN) !== null;
};

export default {
  login,
  logout,
  userIsLoggedIn,
  getUserInfo
};
