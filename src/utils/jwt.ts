function getJWTDetails(jwt: string) {
  // A JWT has 3 parts separated by '.'
  // The middle part is a base64 encoded JSON
  // Decode the base64
  return JSON.parse(atob(jwt.split(".")[1]))
}

export function getJWTExpiry(jwt: string) {
  const jwtDetails = getJWTDetails(jwt)
  return new Date(jwtDetails.exp * 1000)
}

export function jwtHasNotExpired(jwt: string) {
  const expiration = getJWTExpiry(jwt)
  const now = new Date(Date.now())
  return expiration.getTime() > now.getTime()
}
