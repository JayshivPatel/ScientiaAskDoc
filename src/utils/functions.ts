import moment from "moment"
import { AllKeysExtends } from "../constants/types"

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
 * Neutralize an object by parsing specified date members into Date objects.
 *
 * Can be used to neutralize the response object from the api request,
 * as the raw response object stores all Dates members as strings.
 *
 * This function would only work on the keys that are declared to be of 'Date' type.
 * @param dict The object to be neutralized
 * @param dateKeys The keys you wish to neutralize.
 */
export function dateNeutralized<T>(
  dict: T,
  ...dateKeys: AllKeysExtends<T, Date>[]
): T {
  for (const k of dateKeys) {
    const date = dict[k]
    if (typeof date === "string") {
      dict[k] = moment(date).toDate() as any
    }
  }
  return dict
}
