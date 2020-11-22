import moment from 'moment'
import { dateToQueryYear } from './functions'

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