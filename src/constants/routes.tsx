import auth from "utils/auth"
import { AuthService } from "./auth"

interface UrlEnv {
  MATERIALS_URL: string
  EMARKING_URL: string
  CATE_URL: string
  CALENDAR_URL: string
}

const dev: UrlEnv = {
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  CATE_URL: `http://${window.location.hostname}:7000`,
  CALENDAR_URL: `http://${window.location.hostname}:4000`,
  EMARKING_URL: `http://${window.location.hostname}:7000`,
}

const prod: UrlEnv  = {
  MATERIALS_URL: "https://api-materials.doc.ic.ac.uk",
  EMARKING_URL: `http://${window.location.hostname}:7000`,
  CATE_URL: "",
  CALENDAR_URL: "",
}

const test: UrlEnv  = {
  MATERIALS_URL: "TEST_MATERIALS|",
  EMARKING_URL: "TEST_EMARKING|",
  CATE_URL: "TEST_CATE|",
  CALENDAR_URL: "TEST_CALENDAR|",
}

const config = {
  production: prod,
  development: dev,
  test: test
}[process.env.NODE_ENV]

export const methods = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  PATCH: "PATCH",
}

export interface Api {
  auth: AuthService
  url: string,
}

/**
 * Definitions of all external API calls.
 * Each api function returns a pair of authentication service the api uses and its url
 */
export const api = {
  CATE_LOGIN: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/auth/login`
  }),
  CATE_COURSE_EXERCISES: (courseCode: string, username: string = auth.getUserName()): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/courses/${courseCode}/exercises/members/${username}`,
  }),
  CATE_USER_INFO: (username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/auth/${username}`,
  }),
  CATE_AVAILABLE_STUDENTS_FOR_EXERCISE: (courseCode: string, exerciseNumber: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}`,
  }),
  CATE_DELETE_GROUP: (courseCode: string, exerciseNumber: number, groupID: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/groups/${groupID}`,
  }),
  CATE_GROUP_FORMATION: (courseCode: string, exerciseNumber: number, groupID: string, username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/groups/${groupID}/members/${username}`,
  }),
  CATE_GROUP_SINGLE_MEMBER: (courseCode: string, exerciseNumber: number, username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/groups/courses/${courseCode}/exercises/${exerciseNumber}/members/${username}`,
  }),
  CATE_FILE_UPLOAD: (courseCode: string, exerciseNumber: number, username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/upload/courses/${courseCode}/exercises/${exerciseNumber}/students/${username}`,
  }),
  CATE_FILE_DOWNLOAD: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/download`,
  }),
  CATE_DECLARATION: (courseCode: string, exerciseNumber: number, username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/declarations/courses/${courseCode}/exercises/${exerciseNumber}/students/${username}`,
  }),
  CATE_RAW_SUBMISSION: (courseworkSubmissionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/upload/${courseworkSubmissionID}/file`,
  }),

  EMARKING_LOGIN: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/auth/login`,
  }),

  EMARKING_LOGOUT: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/auth/logout`,
  }),

  EMARKING_ME_FEEDBACK: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/feedback`,
  }),
  EMARKING_ME_DISTRIBUTIONS: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/distributions`,
  }),
  
  EMARKING_ME_INFO: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/data`,
  }),

  EMARKING_ME_DASHBOARD: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/dashboard`,
  }),

  EMARKING_FEEDBACK: (feedbackID: number, file?: boolean): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/feedback/${feedbackID}${file ? '/file' : ''}`,
  }),

  EMARKING_FEEDBACK_UPLOAD_BATCH: (distributionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/feedback/batch/distribution/${distributionID}`
  }),

  EMARKING_FEEDBACK_FOR_COURSE: (courseCode: string, username: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/feedback/courses/${courseCode}/members/${username}`
  }),

  EMARKING_DISTRIBUTIONS: (distributionID?: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/distributions${distributionID !== undefined ? '/' + distributionID : ""}`
  }), 
    
  EMARKING_DISTRIBUTION_SUBMISSION: (distributionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/distributions/${distributionID}/submissions`,
  }), 

  EMARKING_DISTRIBUTION_SUBMISSION_ZIPPED: (distributionID: number): Api => {
    const { auth, url } = api.EMARKING_DISTRIBUTION_SUBMISSION(distributionID)
    return {
      auth: auth,
      url: `${url}/zipped`
    }
  },

  EMARKING_DISTRIBUTION_FEEDBACK: (distributionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/distributions/${distributionID}/feedback`,
  }),

  EMARKING_DISTRIBUTION_FEEDBACK_ZIPPED: (distributionID: number): Api => {
    const { auth, url } = api.EMARKING_DISTRIBUTION_FEEDBACK(distributionID)
    return {
      auth: auth,
      url: `${url}/zipped`
    }
  },

  EMARKING_SUBMISSION_FILE: (submissionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/submissions/${submissionID}/file`,
  }), 

  MATERIALS_LOGIN: (): Api => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/auth/login`,
  }),
  
  MATERIALS_COURSES: (year: string): Api => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/courses/${year}`,
  }),

  MATERIALS_RESOURCES: (): Api => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources`,
  }), 

  MATERIALS_RESOURCES_ID: (id: number): Api => ({
    auth: AuthService.MATERIALS,
    url: `${config.MATERIALS_URL}/resources/${id}`,
  }), 
    
  MATERIALS_RESOURCES_FILE: (id: number): Api => ({
    auth: AuthService.MATERIALS,
    url: `${api.MATERIALS_RESOURCES_ID(id)}/file`,
  }), 
    
  MATERIALS_ZIPPED: (): Api => ({
    auth: AuthService.MATERIALS,
    url: config.MATERIALS_URL + "/resources/zipped",
  }),
  MATERIALS_ZIPPED_SELECTION: (): Api => ({
    auth: AuthService.MATERIALS,
    url: config.MATERIALS_URL + "/resources/zipped/selection",
  }),
  CALENDAR_EVENTS: (id: string): Api => ({
    auth: AuthService.MATERIALS,
    url: `${config.CALENDAR_URL}/${id}`,
  })
}