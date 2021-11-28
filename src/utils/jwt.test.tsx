import { getJWTExpiry } from "./jwt"

describe("getJWTExpiry", () => {
  const sample_jwt1 =
    "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE2MzgyMTg0NjMsImlhdCI6MTYzODEzMjA2M30.2UnIY0AbEjIYYsj96OhA7NMVCktovWDtof9N0zBtskY"
  const expected_expiry1 = new Date("2021-11-29T20:41:03.000")
  const sample_jwt2 =
    "eyJhbGciOiJIUzI1NiJ9.eyJJc3N1ZXIiOiJJc3N1ZXIiLCJleHAiOjE1NjExNDk2NjMsImlhdCI6MTYzODEzMjA2M30.XxdfeKlWoG7cBZHYraPBrcWfmH2xt - Z0mq_QFffkm_I"
  const expected_expiry2 = new Date("2019-06-21T20:41:03.000Z")

  it("gets correct expiry dates", () => {
    const expiry1 = getJWTExpiry(sample_jwt1)
    expect(expiry1).toEqual(expected_expiry1)
    const expiry2 = getJWTExpiry(sample_jwt2)
    expect(expiry2).toEqual(expected_expiry2)
  })
})
