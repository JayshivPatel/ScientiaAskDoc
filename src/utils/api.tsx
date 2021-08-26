import authConstants from "constants/auth"
import { ApiEndpoint, methods } from "constants/routes"
import { RequestData } from "./api-types"

interface RequestOptions {
  [key: string]: any
}

// API calling interface. onSuccess and onError are functions that take in data
// and error parameters respectively. Body is process as query parameters if
// method is GET
// Note: will trigger CORS OPTIONS preflight due to the Authorization header
export async function request(data: RequestData) {
  let headers: { [key: string]: string } = {
    Authorization: authConstants.ACCESS_TOKEN_HEADER(data.endpoint.auth),
    // "Access-Control-Allow-Origin": "*", THIS SHOULD NOT BE NEEDED HERE
  }

  if (!data.sendFile) {
    headers["Content-Type"] = "application/json"
  }

  let options: RequestOptions = {
    method: data.method,
    mode: "cors",
    headers: headers,
  }

  let url = data.endpoint.url
  if (data.method === methods.GET || data.method === methods.DELETE) {
    url = `${url}?${new URLSearchParams(data.body)}`
  } else {
    options.body = data.sendFile ? data.body : JSON.stringify(data.body)
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw response
      }
      if (data.returnBlob) {
        return response.blob()
      }
      return response.text().then((text) => {
        return text ? JSON.parse(text) : null
      })
    })
    .then((responseData) => {
      data.onSuccess(responseData)
    })
    .catch((error) => {
      // Parse error object if returned by API
      // Currently follows Materials API error shape
      try {
        error.json().then((body: { message: string }) => {
          data.onError(body.message)
        })
      } catch (e) {
        data.onError(error)
      }
    })
}

// Utility that downloads files fetched by request (assumes GET)
export async function download(
  endpoint: ApiEndpoint,
  filename: string,
  body?: any
) {
  const onSuccess = (blob: any) => {
    let blob_url = URL.createObjectURL(blob)
    downloadBlob(blob_url, filename)
  }

  const onError = (message: string) => {
    // TODO: Deal with download failure (also with openResource)
    console.log(message)
  }

  request({
    endpoint: endpoint,
    method: methods.GET,
    onSuccess,
    onError,
    returnBlob: true,
    body,
  })
}

export function downloadBlob(blob_url: string, filename: string) {
  let a = document.createElement("a")
  a.href = blob_url
  a.download = filename
  a.click()
  a.remove()
  return a
}
