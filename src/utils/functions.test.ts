import moment from 'moment'
import { addDays, dateNeutralized, dateToQueryYear, emailFromUsername, showCohort, showFileSize, titleCase } from './functions'

const date = (dateString: string) => moment.utc(dateString, "DD/MM/YYYY").toDate()

describe("Test function 'titleCase'", () => {
  it("returns correct title case format of the given string", () => {
    expect(titleCase("she sells seashells on the seashore")).toBe("She Sells Seashells On The Seashore")
  })

  it("handles non-upper-able leading chars correctly", () => {
    expect(titleCase("1mperial college")).toBe("1mperial College")
    expect(titleCase("Hello World")).toBe("Hello World")
    expect(titleCase("@decorator")).toBe("@decorator")
  })
})


describe("Test function 'showFileSize'", () => {
  it("returns correct file size", () => {
    const expectations: [number, string, string][] = [
      [25 * (1024 ** 0), "25 B", "25.00 B"],
      [25 * (1024 ** 1), "25 kB", "25.00 kB"],
      [25 * (1024 ** 2), "25 MB", "25.00 MB"],
      [25 * (1024 ** 3), "25 GB", "25.00 GB"],
      [25 * (1024 ** 4), "25 TB", "25.00 TB"],
    ]
    for (const [size, expectation0, expectation2] of expectations) {
      expect(showFileSize(size, 0)).toBe(expectation0)
      expect(showFileSize(size, 2)).toBe(expectation2)
    }
  })

  it("default decimal precision is set to 2", () => {
    const size = 25 * (1024 ** 2)
    expect(showFileSize(size)).toBe(showFileSize(size, 2))
  })
})

describe("Test function 'addDays", () => {
  it("should handle cases where days count are positive", () => {
    expect(addDays(date("01/01/2000"), 10)).toEqual(date("11/01/2000"))
    expect(addDays(date("31/05/1990"), 1)).toEqual(date("01/06/1990"))
  })

  it("should handle cases where days count are negative", () => {
    expect(addDays(date("01/01/2000"), -1)).toEqual(date("31/12/1999"))
  })

  it("should not change the original date object", () => {
    const dateObject = date("01/01/2000")
    const oldDate = new Date(dateObject)
    addDays(dateObject, 100)
    expect(dateObject).toEqual(oldDate)
  })
})

describe("Test function 'dateToQueryYear'", () => {

  it("Check normal dates", () => {
    expect(dateToQueryYear(date("01/10/2020"))).toBe(2021)
    expect(dateToQueryYear(date("15/03/2021"))).toBe(2021)
    expect(dateToQueryYear(date("25/12/2019"))).toBe(1920)
    expect(dateToQueryYear(date("30/09/2020"))).toBe(1920)
  })

  it("1 second before 01/10/2020 is in 1920", () => {
    expect(dateToQueryYear(moment(date("01/10/2020")).subtract(1, 'seconds').toDate())).toBe(1920)
  })

})

describe("Test function 'emailFromUsername'", () => {
  it("returns correct email for username", () => {
    expect(emailFromUsername("abc123")).toBe("abc123@ic.ac.uk")
  })
})

describe("Test function 'showCohort'", () => {
  it("returns correct string for each cohort", () => {
    expect(showCohort("j3")).toBe("Joint Maths & Computing - Year 3")
    expect(showCohort("c1")).toBe("Computing - Year 1")
  })

  it("returns Unknown for invalid cohort ID", () => {
    const unknown = (cid: string) => `Unknown Cohort: ${cid}` 
    const candidates = ["j10", "aabbcc", "a1", "Susan Jackson"]
    for(const invalid of candidates) {
      expect(showCohort(invalid)).toBe(unknown(invalid))
    }
  })
})


interface WithDateType1 {
  date1: Date
  date2: Date
  date3: Date
}

const date1 = "2020-11-02T08:00:00"
const date2 = "2018-09-16T12:33:44"
const date3 = "2000-02-01T23:00:00"

describe("Test function 'dateNeutralized'", () => {

  it("Should convert all date keys", () => {
    const obj = {
      date1: date1,
      date2: date2,
      date3: date3,
    } as any as WithDateType1
    const newObject = dateNeutralized<WithDateType1>(obj, 'date1', 'date2', 'date3')
    expect(newObject.date1.getUTCFullYear()).toBe(2020)
    expect(newObject.date2.getUTCFullYear()).toBe(2018)
    expect(newObject.date3.getUTCFullYear()).toBe(2000)
  })

  it("Should leave unspecified keys untouched", () => {
    const obj = {
      date1: date1,
      date2: date2,
      date3: date3,
    } as any as WithDateType1
    const newObject = dateNeutralized<WithDateType1>(obj, 'date1')
    expect(newObject.date1.getUTCFullYear()).toBe(2020)
    expect(newObject.date2 as any as string).toBe(date2)
    expect(newObject.date3 as any as string).toBe(date3)
  })

  it("Calling this function twice on same object should not have any effect", () => {
    const obj = {
      date1: date1,
      date2: date2,
      date3: date3,
    } as any as WithDateType1
    const newObject1 = dateNeutralized<WithDateType1>(obj, 'date1')
    const newObject2 = dateNeutralized<WithDateType1>(obj, 'date1')
    const newObject3 = dateNeutralized<WithDateType1>(newObject1, 'date1')
    expect(newObject2.date1.getUTCFullYear()).toBe(2020)
    expect(newObject3.date1.getUTCFullYear()).toBe(2020)
  })
})