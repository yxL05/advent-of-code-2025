import { logSolution, readLines } from '../utils.js'

// Helpers
function getMaxJoltage(bank: string, digits: number): number {
  let joltageStr = ''
  let prevIndex = -1

  while (joltageStr.length < digits) {
    let nextDigit: string | undefined
    for (let i = prevIndex + 1; i <= bank.length - digits + joltageStr.length; i++) {
      if (!nextDigit || Number(bank[i]) > Number(nextDigit)) {
        nextDigit = bank[i]
        prevIndex = i
      }

      if (nextDigit === '9') {
        break
      }
    }

    // console.log('Curr string:', joltageStr)
    // console.log('Next digit found:', nextDigit)

    joltageStr += nextDigit
  }

  return Number(joltageStr)
}

// Part 1
function solveP1(banks: string[]): number {
  return banks.map((bank) => getMaxJoltage(bank, 2)).reduce((prev, curr) => prev + curr)
}

// Part 2
function solveP2(banks: string[]): number {
  return banks.map((bank) => getMaxJoltage(bank, 12)).reduce((prev, curr) => prev + curr)
}

const FILE_PATH = './day-3/input.txt'
const output = solveP2(readLines(FILE_PATH))

logSolution(FILE_PATH, output)
