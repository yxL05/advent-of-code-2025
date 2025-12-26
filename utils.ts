import fs from 'node:fs'

export function readLines(path: string): string[] {
  return fs.readFileSync(path, 'utf-8').split('\n')
}

export function logSolution(path: string, output: unknown) {
  console.log(`File path: ${path}, output: ${output}`)
}
