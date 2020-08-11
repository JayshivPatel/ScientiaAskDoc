import authConstants from "../constants/auth";
import authenticationService from "../utils/auth";

interface RequestOptions {
    [key: string]: any
}

export async function request(url: string, method: string, onSuccess: any, onError: any, body?: any) {
  if (!authenticationService.userIsLoggedIn()) {
    await authenticationService.login("abc123", "a");
  }
  
  var options: RequestOptions = {
    method: method,
    mode: "cors",
    headers: { 
      "Authorization": authConstants.ACCESS_TOKEN_HEADER(),
      "Access-Control-Allow-Origin": "*",
    },
  };

  if (method !== "GET") {
      options.body = JSON.stringify(body);
  }

  return fetch(url, options)
    .then((result) => {
      onSuccess(result);
    }, (error) => {
      onError(error);
    })
}
