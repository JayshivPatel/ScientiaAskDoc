const authConstants = {
  ACCESS_TOKEN_HEADER: () => `Bearer ${sessionStorage.getItem("currentUser")}`,
  ACCESS_TOKEN: "currentUser",
  USER_INFO: "userInfo",
}

export default authConstants
