import { logSolution, readLines } from '../utils.js'

// Helpers
function parseIntervalStr(buffer: string): number[][] {
  // '1-2,3-4' -> ['1-2','3-4'] -> [['1', '2'], ['3', '4']] -> [[1, 2], [3, 4]]
  return buffer.split(',').map((intervalStr) => intervalStr.split('-').map((boundStr) => Number(boundStr)))
}

function isInvalidID(id: number, reps: number) {
  const strLen = String(id).length
  if (strLen % reps !== 0) {
    return false
  }

  const segLen = strLen / reps

  let prev: String | undefined
  for (let end = segLen; end <= strLen; end += segLen) {
    const curr = String(id).slice(end - segLen, end)

    if (prev && prev !== curr) {
      return false
    }

    prev = curr
  }

  return true
}

// Part 1
function solveP1(intervals: number[][]): number {
  let sum = 0

  for (const [start, end] of intervals) {
    for (let i = start!; i <= end!; i++) {
      if (isInvalidID(i, 2)) {
        sum += i
      }
    }
  }

  return sum
}

// Part 2
function solveP2(intervals: number[][]): number {
  let sum = 0

  for (const [start, end] of intervals) {
    for (let i = start!; i <= end!; i++) {
      for (let reps = 2; reps <= String(i).length; reps++) {
        if (isInvalidID(i, reps)) {
          sum += i
          break
        }
      }
    }
  }

  return sum
}

const FILE_PATH = './day-2/input.txt'
const output = solveP2(parseIntervalStr(readLines(FILE_PATH)[0]!))

logSolution(FILE_PATH, output)
