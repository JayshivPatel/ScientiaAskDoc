import { AuthService } from "./auth"

const dev = {
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  CALENDAR_URL: `http://${window.location.hostname}:4000`,
  DOC_URL: `http://${window.location.hostname}:2000`,
}

const prod = {
  MATERIALS_URL: "https://api-materials.doc.ic.ac.uk",
  CALENDAR_URL: "",
  DOC_URL: "",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

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
  MATERIALS_ZIPPED_SELECTION: {
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources/zipped/selection`,
  },
  CALENDAR_EVENTS: (id: string): ApiEndpoint => ({
    auth: AuthService.MATERIALS,
    url: `${config.CALENDAR_URL}/${id}`,
  }),
}
