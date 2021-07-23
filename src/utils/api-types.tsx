export interface RequestData {
  url: string
  method: string
  onSuccess: any
  onError: (message: string) => void
  body?: any
  sendFile?: boolean
  returnBlob?: boolean
}
