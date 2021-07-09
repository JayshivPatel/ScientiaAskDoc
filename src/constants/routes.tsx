const dev = {
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  CALENDAR_URL: `http://${window.location.hostname}:4000`,
  DOC_URL: `http://${window.location.hostname}:2000`,
};

const prod = {
  MATERIALS_URL: "https://api-materials.doc.ic.ac.uk",
  CALENDAR_URL: "",
  DOC_URL: "",
};

const config = process.env.NODE_ENV === "production" ? prod : dev;

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const api = {
  DBC_TERMS: (year: string) => `${config.MATERIALS_URL}/dbc/periods/${year}`,
  DOC_MY_EXERCISES: (year: string, courseCode: string) =>
    `${config.MATERIALS_URL}/dbc/me/${year}/courses/${courseCode}/exercises`,
  MATERIALS_LOGIN: `${config.MATERIALS_URL}/auth/login`,
  MATERIALS_COURSES: (year: string) =>
    `${config.MATERIALS_URL}/courses/${year}`,
  MATERIALS_RESOURCES: `${config.MATERIALS_URL}/resources`,
  MATERIALS_RESOURCES_ID: (id: number) =>
    `${config.MATERIALS_URL}/resources/${id}`,
  MATERIALS_RESOURCES_FILE: (id: number) =>
    `${api.MATERIALS_RESOURCES_ID(id)}/file`,
  MATERIALS_ZIPPED: config.MATERIALS_URL + "/resources/zipped",
  MATERIALS_ZIPPED_SELECTION:
    config.MATERIALS_URL + "/resources/zipped/selection",
  CALENDAR_EVENTS: (id: string) => `${config.CALENDAR_URL}/${id}`,
};
