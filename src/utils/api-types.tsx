import { ApiEndpoint } from "../constants/routes"

export interface RequestData {
  endpoint: ApiEndpoint
  method: string
  onSuccess: any
  onError: (message: string) => void
  body?: any
  queryString?: string
  sendFile?: boolean
  returnBlob?: boolean
}
