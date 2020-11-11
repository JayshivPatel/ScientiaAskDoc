import { AuthService } from "./auth"

const dev = {
  MATERIALS_URL: `http://${window.location.hostname}:5000`,
  CATE_URL: `http://${window.location.hostname}:7000`,
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

export interface Api {
  auth: AuthService
  url: string,
}

export const api = {
  CATE_LOGIN: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/auth/login`
  }),
  CATE_COURSE_EXERCISES: (courseCode: string): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.CATE_URL}/courses/${courseCode}/exercises`,
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

  EMARKING_ME_FEEDBACK: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/feedback`,
  }),
  EMARKING_ME_DISTRIBUTIONS: (): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/me/distributions`,
  }),

  EMARKING_FEEDBACK: (feedbackID: number, file?: boolean): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/feedback/${feedbackID}${file ? '/file' : ''}`,
  }),

  EMARKING_DISTRIBUTIONS: (distributionID?: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/distributions${distributionID !== undefined ? '/' + distributionID : ""}`
  }), 
    
  EMARKING_DISTRIBUTION_SUBMISSION: (distributionID: number): Api => ({
    auth: AuthService.EMARKING,
    url: `${config.EMARKING_URL}/distributions/${distributionID}/submissions`,
  }), 

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