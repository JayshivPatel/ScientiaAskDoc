const dev = {
  MATERIALS_URL: "http://localhost:5000"
}

const prod = {
  MATERIALS_URL: "https://materials.doc.ic.ac.uk",
}

const LOGIN = "/auth/login"
const config = process.env.NODE_ENV === "development" ? dev : prod;

export const api = {
  MATERIALS_LOGIN: config.MATERIALS_URL + LOGIN,
  MATERIALS_COURSES: config.MATERIALS_URL + "/courses/1819"
}