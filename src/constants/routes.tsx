const dev = {
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  CATE_URL: `http://${window.location.hostname}:2000`,
  CALENDAR_URL: `http://${window.location.hostname}:4000`,
  EMARKING_URL: `http://${window.location.hostname}:7000`,
}

const prod = {
  MATERIALS_URL: "https://api-materials.doc.ic.ac.uk",
  EMARKING_URL: `http://${window.location.hostname}:7000`,
  CATE_URL: "",
  CALENDAR_URL: "",
}

const config = process.env.NODE_ENV === "production" ? prod : dev

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
}

export const api = {
  CATE_LOGIN: `${config.CATE_URL}/auth/login`,
  CATE_COURSE_EXERCISES: (courseCode: string) =>`${config.CATE_URL}/courses/${courseCode}/exercises`,
  CATE_USER_INFO: (username: string) => `${config.CATE_URL}/auth/${username}`,
  CATE_AVAILABLE_STUDENTS_FOR_EXERCISE: (courseCode: string, exerciseNumber: number) =>
    `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}`,
  CATE_DELETE_GROUP: (courseCode: string, exerciseNumber: number, groupID: string) =>
    `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/groups/${groupID}`,
  CATE_GROUP_FORMATION: (courseCode: string, exerciseNumber: number, groupID: string, username: string) =>
    `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/groups/${groupID}/members/${username}`,
  CATE_GROUP_SINGLE_MEMBER: (courseCode: string, exerciseNumber: number, username: string) =>
    `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/members/${username}`,
  CATE_FILE_UPLOAD: (courseCode: string, exerciseNumber: number, username: string) =>
    `${config.CATE_URL}/upload/courses/${courseCode}/exercises/${exerciseNumber}/students/${username}`,
  CATE_FILE_DOWNLOAD: `${config.CATE_URL}/download`,
  CATE_DECLARATION: (courseCode: string, exerciseNumber: number, username: string) =>
    `${config.CATE_URL}/declarations/courses/${courseCode}/exercises/${exerciseNumber}/students/${username}`,

  EMARKING_ME_FEEDBACK: `${config.EMARKING_URL}/me/feedback`,
  EMARKING_ME_DISTRIBUTIONS: `${config.EMARKING_URL}/me/distributions`,

  EMARKING_DISTRIBUTION_SUBMISSION: (distributionID: string) => 
    `${config.EMARKING_URL}/distributions/${distributionID}/submissions`,

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
}
