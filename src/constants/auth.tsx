const authConstants = {
  ACCESS_TOKEN_HEADER: (service: AuthService) =>
    `Bearer ${localStorage.getItem(authConstants.ACCESS_TOKEN(service))}`,
  REFRESH_TOKEN_HEADER: (service: AuthService) =>
    `Bearer ${localStorage.getItem(authConstants.REFRESH_TOKEN(service))}`,
  ACCESS_TOKEN: (service: AuthService) => `accessToken-${service}`,
  REFRESH_TOKEN: (service: AuthService) => `refreshToken-${service}`,
}

export enum AuthService {
  MATERIALS = "materials",
  EMARKING = "emarking",
}

export const authServices = [AuthService.MATERIALS, AuthService.EMARKING]

export default authConstants
