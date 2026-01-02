import { Heap, MaxHeap } from 'datastructures-js'
import { logSolution, readLines } from '../utils.js'

// Types
type Coord = [number, number, number] // (x, y, z)
type Connection = {
  distance: number
  c1: string
  c2: string
}

// Helpers
function parseCoord(line: string): Coord {
  return line.split(',').map((coordStr) => Number(coordStr)) as Coord
}

function getDistance(c1: Coord, c2: Coord): number {
  const [x1, y1, z1] = c1
  const [x2, y2, z2] = c2

  return ((x1 - x2) ** 2 + (y1 - y2) ** 2 + (z1 - z2) ** 2) ** 0.5
}

function getShortestConnections(coordStrs: string[], count: number): Connection[] {
  const heap = new Heap<Connection>((d1, d2) => d1.distance - d2.distance)

  for (let i = 0; i < coordStrs.length; i++) {
    for (let j = i + 1; j < coordStrs.length; j++) {
      const c1 = coordStrs[i]!
      const c2 = coordStrs[j]!
      heap.push({
        distance: getDistance(parseCoord(c1), parseCoord(c2)),
        c1,
        c2,
      })
    }
  }

  const res: Connection[] = []

  for (let i = 0; i < count; i++) {
    res.push(heap.pop()!)
  }

  console.log(res)

  return res
}

function sortConnectionsByDistanceIncr(coordStrs: string[]): Connection[] {
  return getShortestConnections(coordStrs, (coordStrs.length * (coordStrs.length - 1)) / 2)
}

function getCircuits(connections: Connection[]): Set<string>[] {
  const circuits: Set<string>[] = []

  for (const { c1, c2 } of connections) {
    const existingCircuits: { index: number; circuit: Set<string> }[] = []

    for (const [index, circuit] of circuits.entries()) {
      if (circuit.has(c1) || circuit.has(c2)) {
        existingCircuits.push({ index, circuit })
      }
    }

    if (existingCircuits.length >= 2) {
      circuits[existingCircuits[0]!.index] = existingCircuits
        .map((obj) => obj.circuit)
        .reduce((acc, curr) => acc.union(curr))

      const mergedCircuit = circuits[existingCircuits[0]!.index]!
      if (!mergedCircuit.has(c1)) {
        mergedCircuit.add(c1)
      }
      if (!mergedCircuit.has(c2)) {
        mergedCircuit.add(c2)
      }

      for (let i = existingCircuits.length - 1; i > 0; i--) {
        circuits.splice(existingCircuits[i]!.index, 1)
      }
    }

    if (existingCircuits.length === 1) {
      if (!existingCircuits[0]!.circuit.has(c1)) {
        existingCircuits[0]!.circuit.add(c1)
      }

      if (!existingCircuits[0]!.circuit.has(c2)) {
        existingCircuits[0]!.circuit.add(c2)
      }
    }

    if (existingCircuits.length === 0) {
      circuits.push(new Set([c1, c2]))
    }
  }

  return circuits
}

function getTopKCircuitLength(circuits: Set<string>[], k: number): number[] {
  const heap = new MaxHeap<number>()

  for (const circuit of circuits) {
    heap.push(circuit.size)
  }

  const res: number[] = []
  for (let i = 0; i < k; i++) {
    res.push(heap.pop()!)
  }

  return res
}

function getCircuitClosingConnection(connections: Connection[], size: number): Connection {
  const circuits: Set<string>[] = []

  for (const { distance, c1, c2 } of connections) {
    const existingCircuits: { index: number; circuit: Set<string> }[] = []

    for (const [index, circuit] of circuits.entries()) {
      if (circuit.has(c1) || circuit.has(c2)) {
        existingCircuits.push({ index, circuit })
      }
    }

    if (existingCircuits.length >= 2) {
      circuits[existingCircuits[0]!.index] = existingCircuits
        .map((obj) => obj.circuit)
        .reduce((acc, curr) => acc.union(curr))

      const mergedCircuit = circuits[existingCircuits[0]!.index]!
      if (!mergedCircuit.has(c1)) {
        mergedCircuit.add(c1)
      }
      if (!mergedCircuit.has(c2)) {
        mergedCircuit.add(c2)
      }

      for (let i = existingCircuits.length - 1; i > 0; i--) {
        circuits.splice(existingCircuits[i]!.index, 1)
      }
    }

    if (existingCircuits.length === 1) {
      if (!existingCircuits[0]!.circuit.has(c1)) {
        existingCircuits[0]!.circuit.add(c1)
      }

      if (!existingCircuits[0]!.circuit.has(c2)) {
        existingCircuits[0]!.circuit.add(c2)
      }
    }

    if (existingCircuits.length === 0) {
      circuits.push(new Set([c1, c2]))
    }

    if (circuits.length === 1 && circuits[0]?.size === size) {
      return { distance, c1, c2 }
    }
  }

  throw new Error('Skill issue.')
}

// Part 1
function solveP1(coordStrs: string[]): number {
  return getTopKCircuitLength(getCircuits(getShortestConnections(coordStrs, 1000)), 3).reduce((acc, curr) => acc * curr)
}

// Part 2
function solveP2(coordStrs: string[]): number {
  const closingConnection = getCircuitClosingConnection(sortConnectionsByDistanceIncr(coordStrs), coordStrs.length)
  const x1 = parseCoord(closingConnection.c1)[0]
  const x2 = parseCoord(closingConnection.c2)[0]
  return x1 * x2
}

const FILE_PATH = './day-8/input.txt'
const output = solveP2(readLines(FILE_PATH))

logSolution(FILE_PATH, output)
