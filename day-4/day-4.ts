import { logSolution, readLines } from '../utils.js'

// Helpers
function parseGrid(buffer: string[]): string[][] {
  return buffer.map((line) => line.split(''))
}

function checkPosition(grid: string[][], row: number, col: number): boolean {
  if (grid[row]![col] !== '@') {
    return false
  }

  const ROWS = grid.length
  const COLS = grid[0]!.length

  let count = 0

  for (let i = row - 1; i <= row + 1; i++) {
    if (i < 0 || i >= ROWS) {
      continue
    }

    for (let j = col - 1; j <= col + 1; j++) {
      if (j < 0 || j >= COLS) {
        continue
      }

      if (i === row && j === col) {
        continue
      }

      if (grid[i]![j] === '@') {
        count++
      }
    }
  }

  return count < 4
}

function removeOnce(grid: string[][]): number {
  const ROWS = grid.length
  const COLS = grid[0]!.length

  let count = 0

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (checkPosition(grid, i, j)) {
        grid[i]![j] = '.'
        count++
      }
    }
  }

  return count
}

// Part 1
function solveP1(grid: string[][]): number {
  const ROWS = grid.length
  const COLS = grid[0]!.length

  let count = 0

  for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
      if (checkPosition(grid, i, j)) {
        count++
      }
    }
  }

  return count
}

// Part 2
function solveP2(grid: string[][]): number {
  let count = 0
  let removed = 0

  do {
    removed = removeOnce(grid)
    count += removed
  } while (removed > 0)

  return count
}

const FILE_PATH = './day-4/input.txt'
const output = solveP2(parseGrid(readLines(FILE_PATH)))
logSolution(FILE_PATH, output)
