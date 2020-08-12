const dev = {
  MATERIALS_URL: "http://localhost:5000"
}

const prod = {
  MATERIALS_URL: "https://materials.doc.ic.ac.uk",
}

const config = process.env.NODE_ENV === "development" ? dev : prod;

export const api = {
  MATERIALS_LOGIN: config.MATERIALS_URL + "/auth/login",
  MATERIALS_COURSES: config.MATERIALS_URL + "/courses/1819",
  MATERIALS_RESOURCES: config.MATERIALS_URL + "/resources"
}