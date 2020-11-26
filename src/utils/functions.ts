import { AllKeysExtends } from "constants/types"
import moment from "moment"

/**
 * Converts the given sentence to title case, by rewriting the first letter
 * in each word to upper case.
 * @param string the given string object
 */
export function titleCase(string: string) {
  var sentence = string.toLowerCase().split(" ")
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  return sentence.join(" ")
}

/**
 * Add a given number of days to the given date, returns a new date object.
 * @param date given date object
 * @param days date offset
 */
export function addDays(date: Date, days: number) {
  let result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

// get nearest whole number days since 1970-01-01 to compare dates in the british timezone
export function toDayCount(date: Date) {
  return Math.floor(date.getTime() / 86400000)
}

export function openExternal(url: string) {
  const win = window.open(url, "_blank")
  if (win != null) {
    win.focus()
  }
}

export function toEventDateTime(date: Date) {
  return (
    date.toLocaleDateString() +
    ", " +
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })
  )
}

export function theme() {
  return document.documentElement.getAttribute("data-theme")
}

/**
 * Convert number of bytes into a string that is human-readable
 * @param bytes Number of bytes
 * @param precision Decimal precision (default = 2)
 */
export function showFileSize(bytes: number, precision: number = 2) {
  const thresh = 1024
  if (bytes < thresh) {
    return `${bytes.toFixed(precision)} B`
  }
  const units = ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  let u = -1;
  const r = 10 ** precision;
  do {
    bytes /= thresh;
    ++u;
  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

  return bytes.toFixed(precision) + ' ' + units[u];
}

/**
 * Convert the date into the academic year that this date is in.
 * The academic year will be in "aabb" form i.e. 2021 means 2020 - 2021 academic year.
 * @param date Date object
 */
export function dateToQueryYear(date: Date = moment().toDate()): number {
  const joinYear = (from: number, to: number) => (from % 100) * 100 + (to % 100)
  const currYear = date.getUTCFullYear()
  const termStart = moment.utc(`01/10/${currYear}`, "DD/MM/YYYY").toDate()
  if (date < termStart) {
    return joinYear(currYear - 1, currYear)
  }
  return joinYear(currYear, currYear + 1)
}

/**
 * Convert college username to his/her email account.
 * @param username college username (i.e. abc20)
 */
export function emailFromUsername(username: string): string {
  return `${username}@ic.ac.uk`
}

/**
 * TODO: not implemented
 * 
 * Show the full cohort string of the given cohortID
 * i.e. 'c3' => 'Computing - Year 3'
 * @param cohortID cohort id of the student (e.g. 'c3')
 */
export function showCohort(cohortID: string): string {
  if (!cohortID.match(/^[c|j][0-9]$/)) {
    return `Unknown Cohort: ${cohortID}` 
  }
  const parts = cohortID[0]
  const year = Number(cohortID[1])
  const course = parts[0] === 'c' ? "Computing" : "Joint Maths & Computing"
  return `${course} - Year ${year}`
}

/**
 * Neutralize an object by parsing specified date members into Date objects. 
 * 
 * Can be used to neutralize the response object from the api request,
 * as the raw response object stores all Dates members as strings.
 * 
 * This function would only work on the keys that are declared to be of 'Date' type. 
 * @param dict The object to be neutralized
 * @param dateKeys The keys you wish to neutralize.
 */
export function dateNeutralized<T>(dict: T, ...dateKeys: AllKeysExtends<T, Date>[]): T {
  for (const k of dateKeys) {
    const date = dict[k]
    if (typeof date === 'string') {
      dict[k] = moment(date).toDate() as any
    }
  }
  return dict
} 