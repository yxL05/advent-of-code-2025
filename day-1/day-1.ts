import { logSolution, readLines } from '../utils.js'

// Helpers
function parseRotation(rotation: string) {
  const value = Number(rotation.slice(1))

  return rotation[0] === 'L' ? -value : value
}

function positiveMod(n: number, m: number) {
  return ((n % m) + m) % m
}

function getPassesByZero(value: number, prev: number) {
  if (value === 0) {
    return 1
  }

  if (value >= 100) {
    return Math.floor(value / 100)
  }

  if (value < 0) {
    let passes = Math.floor(Math.abs(value / 100))
    if (prev !== 0) {
      passes++
    }
    return passes
  }

  return 0
}

// Part 1
function solveP1(rotations: string[]): number {
  let count = 0
  let value = 50

  for (const rotation of rotations) {
    // console.log(`Curr value: ${value}, curr count: ${count}`)
    value = positiveMod(value + parseRotation(rotation), 100)
    if (value === 0) {
      count++
    }
  }

  return count
}

// Part 2
function solveP2(rotations: string[]): number {
  let count = 0
  let value = 50

  for (const rotation of rotations) {
    let prev = value
    value += parseRotation(rotation)

    count += getPassesByZero(value, prev)

    value = positiveMod(value, 100)
  }

  return count
}

const FILE_PATH = './day-1/input.txt'
const output = solveP2(readLines(FILE_PATH))

logSolution(FILE_PATH, output)
