import { downloadBlob, parseQueryParams } from "utils/api"

describe("downloadBlob function", () => {
  const blob_url = URL.createObjectURL(new Blob())
  const filename = "filename"
  const link = downloadBlob(blob_url, filename)

  it("creates anchor with correct parameters", () => {
    expect(link.href).toBe(blob_url)
    expect(link.download).toBe(filename)
  })
})

describe("parseQueryParams", () => {
  it("returns URLSearchParams whose string representation contains given key-values", () => {
    const rawParams = { year: "2021", module: "50002" }
    const parsedParams = parseQueryParams(rawParams)
    expect(parsedParams.toString()).toBe("year=2021&module=50002")
  })
  it("returns URLSearchParams whose string representation contains repetitive params for the same key", () => {
    const rawParams = { id: [12, 13] }
    const parsedParams = parseQueryParams(rawParams)
    expect(parsedParams.toString()).toBe("id=12&id=13")
  })
})
