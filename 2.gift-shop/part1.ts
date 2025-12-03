import { parseFile } from '../utils.js'
import { parseInterval } from './utils.js'

function getInvalidIDSum(intervals: number[][]) {
  function getBaseAndMultiplier(digits: number): [number, number] {
    return [10 ** (digits / 2) + 1, digits / 2]
  }

  // (xx) 2 -> 11 = 10 * 1 + 1 -> [1, 10) === [10**0, 10**1]
  // (xxyy) 4 -> 101 = 10 ** 2 + 1 -> [10, 100) === [10**1, 10**2]
  // (xxxyyy) 6 -> 1001

  let sum = 0

  for (const interval of intervals) {
    const start = interval[0]!
    const end = interval[1]!

    const minDigits = String(start).length
    const maxDigits = String(end).length

    const bases: [number, number][] = []
    for (let digits = minDigits; digits <= maxDigits; digits++) {
      if (digits % 2 !== 0) continue
      bases.push(getBaseAndMultiplier(digits))
    }

    for (const [base, multiplier] of bases) {
      for (let i = 10 ** (multiplier - 1); i < 10 ** multiplier; i++) {
        if (base * i >= start && base * i <= end) {
          console.log('Invalid ID:', base * i)
          sum += base * i
        }
      }
    }
  }

  return sum
}

const input = (await parseFile('2.gift-shop/input.txt'))[0]!
console.log(getInvalidIDSum(parseInterval(input)))
