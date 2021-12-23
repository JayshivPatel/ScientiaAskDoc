import { AuthService } from "./auth"

const dev = {
  SCIENTIA_URL: `http://${window.location.hostname}:3000`,
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  EMARKING_URL: `http://${window.location.hostname}:5001`,
  CALENDAR_URL: `http://${window.location.hostname}:4000`,
  DOC_URL: `http://${window.location.hostname}:2000`,
}

const prod = {
  SCIENTIA_URL: "https://scientia.doc.ic.ac.uk",
  MATERIALS_URL: "https://api-materials.doc.ic.ac.uk",
  EMARKING_URL: "https://api-emarking.doc.ic.ac.uk",
  CALENDAR_URL: "",
  DOC_URL: "",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

export const scientia_url = config.SCIENTIA_URL

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export interface ApiEndpoint {
  auth: AuthService
  url: string
}

export const api = {
  EMARKING_FEEDBACK: {
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/feedback`,
  },
  EMARKING_FEEDBACK_FILE: (id: number): ApiEndpoint => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/feedback/${id}/file`,
  }),
  EMARKING_LOGIN: {
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/auth/login`,
  },
  EMARKING_REFRESH: {
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/auth/refresh`,
  },
  DBC_TERMS: (year: string): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/dbc/periods/${year}`,
  }),
  DOC_MY_EXERCISES: (year: string, courseCode: string): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/dbc/me/${year}/courses/${courseCode}/exercises`,
  }),
  MATERIALS_LOGIN: {
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/auth/login`,
  },
  MATERIALS_REFRESH: {
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/auth/refresh`,
  },
  MATERIALS_COURSES: (year: string): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/courses/${year}`,
  }),
  MATERIALS_RESOURCES: {
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources`,
  },
  MATERIALS_RESOURCES_ID: (id: number): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources/${id}`,
  }),
  MATERIALS_RESOURCES_FILE: (id: number): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${api.MATERIALS_RESOURCES_ID(id).url}/file`,
  }),
  MATERIALS_ZIPPED: {
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources/zipped`,
  },
  CALENDAR_EVENTS: (id: string): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.CALENDAR_URL}/${id}`,
  }),
}

export const refresh_routes = {
  materials: api.MATERIALS_REFRESH,
  emarking: api.EMARKING_REFRESH,
}
