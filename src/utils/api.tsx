import authConstants from "../constants/auth";
import authenticationService from "../utils/auth";
import { api, methods } from "../constants/routes"

interface RequestOptions {
    [key: string]: any
}

// API calling interface. onSuccess and onError are functions that take in data
// and error parameters respectively. Body is process as query parameters if
// method is GET
// Note: will trigger CORS OPTIONS preflight due to the Authorization header
export async function request(url: string, method: string, onSuccess: any, onError: any, body?: any, username?: string, isFile: boolean = false) {
  if (!authenticationService.userIsLoggedIn() || (username && authenticationService.getUserInfo()["username"] !== username)) {
    // TODO: Credentials should be handled elsewhere
    // TODO: Specific endpoint login route should be passed in
    await authenticationService.login(username ? username : "abc123", "a", api.MATERIALS_LOGIN);
  }

  let headers: { [key: string]: string } = {
    "Authorization": authConstants.ACCESS_TOKEN_HEADER(),
    "Access-Control-Allow-Origin": "*",
  };

  if (!isFile) {
    headers["Content-Type"] = "application/json";
  }

  var options: RequestOptions = {
    method: method,
    mode: "cors",
    headers: headers
  };

  if (method === methods.GET || method === methods.DELETE) {
    url = url + "?" + new URLSearchParams(body);
  } else {
    options.body = isFile ? body : JSON.stringify(body);
  }

  return fetch(url, options)
    .then((result) => {
      onSuccess(result);
    }, (error) => {
      onError(error);
    })
}

export async function staffRequest(url: string, method: string, onSuccess: any, onError: any, body?: any, isFile: boolean = false) {
  return request(url, method, onSuccess, onError, body, "profx", isFile);
}

// Utility that downloads files fetched by request
export async function download(url: string, method: string, filename: string, body?: any) {
  const onSuccess = (data: any) => {
    // TODO: Try to navigate straight to the endpoint url instead of creating an object url
    data.blob().then((blob: any) => {
      let url = URL.createObjectURL(blob);
      let a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      a.remove();
    });
  };

  const onFailure = (error: { text: () => Promise<any> }) => {
    error.text().then((errorText) => {
      console.log(errorText);
    });
  };

  request(url, method, onSuccess, onFailure, body);
}
