export function parseInterval(input: string) {
  return input
    .split(',')
    .map((intervalStr) => intervalStr.split('-'))
    .map((strArr) => strArr.map((str) => Number(str)))
}
