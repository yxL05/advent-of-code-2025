import { logSolution, readLines } from '../utils.js'

// Helpers
function parseDb(buffer: string[]): {
  intervals: number[][]
  ids: number[]
} {
  const emptyLineIndex = buffer.findIndex((line) => line === '')

  return {
    intervals: buffer
      .slice(0, emptyLineIndex)
      .map((intervalStr) => intervalStr.split('-').map((boundStr) => Number(boundStr))),
    ids: buffer.slice(emptyLineIndex + 1).map((idStr) => Number(idStr)),
  }
}

function getNonOverlappingIntervals(intervals: number[][]): number[][] {
  const sorted = intervals.toSorted((int1, int2) => int1[0]! - int2[0]!)

  const res: number[][] = []

  let currStart: number = 0
  let currEnd: number = 0

  for (const [start, end] of sorted) {
    if (start! > currEnd) {
      res.push([start!, end!])
      currStart = start!
      currEnd = end!
    } else if (start! === currEnd) {
      res.at(-1)![1] = end!
      currEnd = end!
    } else {
      if (end! > currEnd) {
        res.at(-1)![1] = end!
        currEnd = end!
      }
    }
  }

  return res
}

// Part 1
function solveP1({ intervals, ids }: { intervals: number[][]; ids: number[] }): number {
  let count = 0

  for (const id of ids) {
    for (const [start, end] of intervals) {
      if (id >= start! && id <= end!) {
        count++
        break
      }
    }
  }

  return count
}

// Part 2
function solveP2(intervals: number[][]): number {
  return getNonOverlappingIntervals(intervals).reduce((prev, [start, end]) => prev + (end! - start! + 1), 0)
}

const FILE_PATH = './day-5/input.txt'
const output = solveP2(parseDb(readLines(FILE_PATH)).intervals)

logSolution(FILE_PATH, output)
