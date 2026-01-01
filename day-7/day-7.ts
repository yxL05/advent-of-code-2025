import { logSolution, readLines } from '../utils.js'

// Types
type Coord = `${number},${number}` // row,col

// Helpers
function parseDiagram(buffer: string[]): string[][] {
  return buffer.map((line) => line.split(''))
}

function getSplits(currRow: number, currCol: number, diagram: string[][], visited: Set<Coord>): number {
  if (currRow >= diagram.length - 1 || currCol < 0 || currCol >= diagram[0]!.length) {
    return 0
  }

  if (visited.has(`${currRow},${currCol}`)) {
    return 0
  }

  visited.add(`${currRow},${currCol}`)

  if (diagram[currRow + 1]![currCol] === '^') {
    return (
      1 + getSplits(currRow + 1, currCol - 1, diagram, visited) + getSplits(currRow + 1, currCol + 1, diagram, visited)
    )
  }

  return getSplits(currRow + 1, currCol, diagram, visited)
}

function getPaths(currRow: number, currCol: number, diagram: string[][], memo: Map<Coord, number>): number {
  if (currCol < 0 || currCol >= diagram[0]!.length) {
    return 0
  }

  if (currRow === diagram.length - 1) {
    return 1
  }

  if (memo.has(`${currRow},${currCol}`)) {
    return memo.get(`${currRow},${currCol}`)!
  }

  if (diagram[currRow + 1]![currCol] === '^') {
    const paths = getPaths(currRow + 1, currCol - 1, diagram, memo) + getPaths(currRow + 1, currCol + 1, diagram, memo)
    memo.set(`${currRow},${currCol}`, paths)
    return paths
  }

  return getPaths(currRow + 1, currCol, diagram, memo)
}

// Part 1
function solveP1(diagram: string[][]): number {
  const [startRow, startCol] = [0, diagram[0]!.findIndex((v) => v === 'S')]

  return getSplits(startRow, startCol, diagram, new Set<Coord>())
}

// Part 2
function solveP2(diagram: string[][]): number {
  const [startRow, startCol] = [0, diagram[0]!.findIndex((v) => v === 'S')]

  return getPaths(startRow, startCol, diagram, new Map<Coord, number>())
}

const FILE_PATH = './day-7/input.txt'
const output = solveP2(parseDiagram(readLines(FILE_PATH)))

logSolution(FILE_PATH, output)
