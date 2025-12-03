import { parseFile } from '../utils.js'
import { parseInterval } from './utils.js'

function getInvalidIdSum(intervals: number[][]) {
  function isInvalid(numString: string) {
    outer: for (let i = Math.floor(numString.length / 2); i >= 1; i--) {
      if (numString.length % i !== 0) continue outer

      let curr: string | undefined
      for (let start = 0; start + i <= numString.length; start += i) {
        const end = start + i
        if (curr && numString.slice(start, end) !== curr) continue outer
        curr = numString.slice(start, end)
      }

      return true
    }

    return false
  }

  let sum = 0

  for (const interval of intervals) {
    for (let i = interval[0]!; i <= interval[1]!; i++) {
      if (isInvalid(String(i))) sum += i
    }
  }

  return sum
}

const input = (await parseFile('2.gift-shop/input.txt'))[0]!
console.log(getInvalidIdSum(parseInterval(input)))
