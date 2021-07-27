import { downloadBlob } from "utils/api"

describe('downloadBlob function', () => {

  const blob_url = URL.createObjectURL(new Blob())
  const filename = "filename"
  const link = downloadBlob(blob_url, filename)

  it('creates anchor with correct parameters', () => {
    expect(link.href).toBe(blob_url)
    expect(link.download).toBe(filename)
  })
})
