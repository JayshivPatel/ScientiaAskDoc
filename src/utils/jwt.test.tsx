import { getJWTExpiry, jwtHasNotExpired } from "./jwt"

// JWT expiring on 2021-11-29 20:41:03 GMT
const sample_jwt1 =
  "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE2MzgyMTg0NjMsImlhdCI6MTYzODEzMjA2M30.2UnIY0AbEjIYYsj96OhA7NMVCktovWDtof9N0zBtskY"

// JWT expiring on 2019-06-21 20:41:03 UTC
const sample_jwt2 =
  "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE1NjExNDk2NjMsImlhdCI6MTYzODEzMjA2M30.XxdfeKlWoG7cBZHYraPBrcWfmH2xt - Z0mq_QFffkm_I"

describe("getJWTExpiry", () => {
  it("gets correct expiry dates", () => {
    expect(getJWTExpiry(sample_jwt1)).toEqual(
      new Date("2021-11-29T20:41:03.000")
    )
    expect(getJWTExpiry(sample_jwt2)).toEqual(
      new Date("2019-06-21T20:41:03.000Z")
    )
  })
})

describe("jwtHasNotExpired", () => {
  Date.now = jest.fn(() => new Date(Date.UTC(2020, 1, 1)).valueOf())

  it("identifies unexpired jwts", () => {
    expect(jwtHasNotExpired(sample_jwt1)).toBeTruthy()
  })

  it("identifies expired jwts", () => {
    expect(jwtHasNotExpired(sample_jwt2)).toBeFalsy()
  })
})
