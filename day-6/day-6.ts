import { logSolution, readLines } from '../utils.js'

// Helpers
function parseOperations(buffer: string[]): string[][] {
  const res: string[][] = []

  for (const line of buffer) {
    res.push(line.split(' ').filter((v) => v !== ''))
  }

  return res
}

function isSeparator(buffer: string[], column: number): boolean {
  return buffer.every((line) => line[column] === ' ')
}

function parseAlignedOperations(buffer: string[]): string[][] {
  const res: string[][] = []

  for (const [row, line] of buffer.entries()) {
    if (row === buffer.length - 1) {
      res.push(line.split(' ').filter((v) => v !== ''))
      continue
    }

    const parsedLine: string[] = []

    let chunk = ''

    for (let col = 0; col < line.length; col++) {
      const char = line[col]!

      if (isSeparator(buffer, col)) {
        parsedLine.push(chunk)
        chunk = ''
        continue
      }

      chunk += char
    }

    parsedLine.push(chunk)

    res.push(parsedLine)
  }

  return res
}

function solveOperation(operation: string[]): number {
  const operator = operation.at(-1)!
  let res = operator === '+' ? 0 : 1

  for (let i = 0; i < operation.length - 1; i++) {
    res = operator === '+' ? res + Number(operation[i]) : res * Number(operation[i])
  }

  return res
}

function getOperation(operations: string[][], column: number) {
  const res = []

  for (const line of operations) {
    if (line[column]) {
      res.push(line[column])
    }
  }

  return res
}

function getVerticalOperation(operations: string[][], column: number): string[] {
  const res: string[] = []

  const len = operations[0]![column]!.length

  for (let pos = len - 1; pos >= 0; pos--) {
    let currNum = ''

    for (let row = 0; row < operations.length - 1; row++) {
      const line = operations[row]!

      if (line[column]!.at(pos) !== ' ') {
        currNum += line[column]!.at(pos)
      }
    }

    res.push(currNum)
  }

  res.push(operations.at(-1)![column]!)

  console.log('Operation array:', res)
  return res
}

// Part 1
function solveP1(operations: string[][]): number {
  const COLS = operations[0]!.length

  let sum = 0

  for (let i = 0; i < COLS; i++) {
    sum += solveOperation(getOperation(operations, i))
  }

  return sum
}

// Part 2
function solveP2(operations: string[][]): number {
  const COLS = operations[0]!.length

  let sum = 0

  for (let i = 0; i < COLS; i++) {
    sum += solveOperation(getVerticalOperation(operations, i))
  }

  return sum
}

const FILE_PATH = './day-6/input.txt'
const output = solveP2(parseAlignedOperations(readLines(FILE_PATH)))

logSolution(FILE_PATH, output)
