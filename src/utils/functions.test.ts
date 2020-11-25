import moment from 'moment'
import { dateNeutralized, dateToQueryYear } from './functions'

const date = (dateString: string) => moment.utc(dateString, "DD/MM/YYYY").toDate()

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