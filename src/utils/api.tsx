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
export async function request(url: string, method: string, onSuccess: any, onError: any, body?: any) {
  if (!authenticationService.userIsLoggedIn()) {
    // TODO: Credentials should be handled elsewhere
    // TODO: Specific endpoint login route should be passed in
    await authenticationService.login("abc123", "a", api.MATERIALS_LOGIN);
  }
  
  var options: RequestOptions = {
    method: method,
    mode: "cors",
    headers: { 
      "Authorization": authConstants.ACCESS_TOKEN_HEADER(),
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (method === methods.GET) {
    url = url + "?" + new URLSearchParams(body);
  } else {
    options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then((result) => {
      onSuccess(result);
    }, (error) => {
      onError(error);
    })
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
