export function titleCase(string: string) {
  var sentence = string.toLowerCase().split(" ");
  for (let i = 0; i < sentence.length; i++) {
    sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
  }
  return sentence.join(" ");
}

export function addDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

// get nearest whole number days since 1970-01-01 to compare dates in the british timezone
export function toDayCount(date: Date) {
  return Math.floor(date.getTime() / 86400000);
}
