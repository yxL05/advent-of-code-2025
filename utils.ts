import { createReadStream } from 'node:fs'
import { createInterface } from 'node:readline'

export async function parseFile(path: string) {
  const fs = createReadStream(path)
  const rl = createInterface({
    input: fs,
    crlfDelay: Infinity,
  })

  const output: string[] = []
  for await (const line of rl) {
    output.push(line)
  }

  return output
}
