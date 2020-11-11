import authConstants, { AuthService } from "constants/auth"
import { Api, methods } from "constants/routes"

interface RequestOptions {
  [key: string]: any
}

export interface OldRequestData {
  url: string
  method: string
  onSuccess: any
  onError: (message: string) => void
  body?: any
  sendFile?: boolean
  returnBlob?: boolean
}

export interface RequestData {
  api: Api
  method: string
  body?: any
  sendFile?: boolean
}

/**
 * API calling interface for requesting a Blob object.
 * @param data The request data object
 */
export async function requestBlob(data: RequestData): Promise<Blob> {
  return doRequest(data).then(response => response.blob())
}

/**
 * API calling interface for requesting a JSON object.
 * @param data The request data object
 */
export async function request<T>(data: RequestData): Promise<T> {
  return doRequest(data)
    .then(response => response.text())
    .then(text => text ? JSON.parse(text) : undefined)
}

/**
 * Internal API calling interface for fetching from remote services.
 * @param data The request data object
 */
export async function doRequest(data: RequestData): Promise<Response> {
  let headers: { [key: string]: string } = {
    Authorization: authConstants.ACCESS_TOKEN_HEADER(data.api.auth),
    // "Access-Control-Allow-Origin": "*", THIS SHOULD NOT BE NEEDED HERE
  }

  if (!data.sendFile) {
    headers["Content-Type"] = "application/json"
  }

  var options: RequestOptions = {
    method: data.method,
    mode: "cors",
    headers: headers,
  }

  if (data.method === methods.GET || data.method === methods.DELETE) {
    data.api.url = data.api.url + "?" + new URLSearchParams(data.body)
  } else {
    options.body = data.sendFile ? data.body : JSON.stringify(data.body)
  }

  return fetch(data.api.url, options)
    .then(response => {
      if (!response.ok) {
        throw response
      }
      return response
    })
    // Catch and parse error object if returned by API
    // Currently follows Materials API error shape
    .catch(async error => {
      try {
        const body = await error.json()
        throw body.message
      } catch (e) {
        throw error
      }
    })
}

// WARNING!!! This API calling interface is **DEPRECATED** and should *NOT* be used in future development.
// API calling interface. onSuccess and onError are functions that take in data
// and error parameters respectively. Body is process as query parameters if
// method is GET
// Note: will trigger CORS OPTIONS preflight due to the Authorization header
export async function oldRequest(data: OldRequestData) {
  const requestResolver = data.returnBlob ? requestBlob : (data: RequestData) => request<any>(data)
  return requestResolver({
    api: {
      auth: AuthService.MATERIALS,
      url: data.url,
    },
    method: data.method,
    body: data.body,
    sendFile: data.sendFile,
  })
  .then(responseData => {
    data.onSuccess(responseData)
  })
  .catch(error => data.onError(error))
}

// Utility that downloads files fetched by request (assumes GET)
export async function download(api: Api, filename: string, body?: any) {
  const onSuccess = (blob: any) => {
    // TODO: Try to navigate straight to the endpoint url instead of creating an object url
    let url = URL.createObjectURL(blob)
    let a = document.createElement("a")
    a.href = url
    a.download = filename
    a.click()
    a.remove()
  }

  const onError = (message: string) => {
    // TODO: Deal with download failure (also with openResource)
    console.log(message)
  }

  requestBlob({
    api: api,
    method: methods.GET,
    body,
  })
  .then(onSuccess)
  .catch(onError)
}