import { Term } from "../../../constants/types";

/**
 * Convenience function to provide a reasonable default value for
 * the current term while waiting for actual year term details.
 * It so appears that the MONTH attribute in JS Date() starts counting from
 * 0 (for Jan): this flaw is inherited from JAVA 1.0.
 * https://stackoverflow.com/questions/2552483/why-does-the-month-argument-range-from-0-to-11-in-javascripts-date-constructor
 */
function getDefaultTerm(): Term {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day = today.getDate();
  if (month >= 9) {
    if (month === 11 && day >= 24)
      return {
        label: "Christmas",
        weeks: 3,
        start: new Date(year, 11, 24),
        end: new Date(year + 1, 0, 7),
      };
    return {
      label: "Autumn",
      start: new Date(year, 9, 1),
      end: new Date(year, 11, 31),
      weeks: 11,
    };
  }
  if (month >= 0 && month <= 2) {
    if (month === 0 && day <= 6)
      return {
        label: "Christmas",
        weeks: 3,
        start: new Date(year - 1, 11, 24),
        end: new Date(year, 0, 6),
      };
    return {
      label: "Spring",
      start: new Date(year, 0, 1),
      end: new Date(year, 2, 31),
      weeks: 11,
    };
  }
  if (month >= 3 && month <= 5) {
    if (month === 3 && day <= 20)
      return {
        label: "Easter",
        weeks: 5,
        start: new Date(year, 3, 1),
        end: new Date(year, 3, 20),
      };
    return {
      label: "Summer",
      start: new Date(year, 3, 20),
      end: new Date(year, 5, 30),
      weeks: 9,
    };
  }
  return {
    label: "June-Sept",
    start: new Date(year, 6, 1),
    end: new Date(year, 8, 30),
    weeks: 12,
  };
}

export default getDefaultTerm;
