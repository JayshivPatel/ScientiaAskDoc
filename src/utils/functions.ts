import moment from "moment"

export function titleCase(string: string) {
  var sentence = string.toLowerCase().split(" ")
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1)
  }
  return sentence.join(" ")
}

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

export function showCohort(cohortID: string): string {
  return "Computing - Year 3"
}