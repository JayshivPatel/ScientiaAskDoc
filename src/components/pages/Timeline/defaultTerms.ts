import { Term } from "../../../constants/types";

/**
 * Convenience function to provide a reasonable default value for
 * the current term while waiting for actual year term details.
 */
function getDefaultTerm(): Term {
  const today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let day = today.getDate();
  if (month >= 10) {
    if (month === 12 && day >= 24)
      return {
        label: "Christmas",
        weeks: 3,
        start: new Date(year, 12, 24),
        end: new Date(year + 1, 1, 7),
      };
    return {
      label: "Autumn",
      start: new Date(year, 10, 1),
      end: new Date(year, 12, 31),
      weeks: 11,
    };
  }
  if (month >= 1 && month <= 3) {
    if (month === 1 && day <= 6)
      return {
        label: "Christmas",
        weeks: 3,
        start: new Date(year - 1, 12, 24),
        end: new Date(year, 1, 6),
      };
    return {
      label: "Spring",
      start: new Date(year, 1, 1),
      end: new Date(year, 3, 31),
      weeks: 11,
    };
  }
  if (month >= 4 && month <= 6) {
    if (month === 4 && day <= 20)
      return {
        label: "Easter",
        weeks: 5,
        start: new Date(year, 4, 1),
        end: new Date(year, 4, 20),
      };
    return {
      label: "Summer",
      start: new Date(year, 4, 20),
      end: new Date(year, 6, 30),
      weeks: 9,
    };
  }
  return {
    label: "June-Sept",
    start: new Date(year, 7, 1),
    end: new Date(year, 9, 30),
    weeks: 12,
  };
}

export default getDefaultTerm;
