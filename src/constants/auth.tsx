const authConstants = {
  ACCESS_TOKEN_HEADER: (service: AuthService) => 
    `Bearer ${sessionStorage.getItem(authConstants.ACCESS_TOKEN(service))}`,
  ACCESS_TOKEN: (service: AuthService) => `currentUser-${service}`,
  USER_INFO: (service: AuthService) => `userInfo-${service}`,
}

export enum AuthService {
  MATERIALS = 'materials',
  EMARKING = 'emarking',
}

export const authServices = [
  AuthService.EMARKING,
  AuthService.MATERIALS,
]

export default authConstants
