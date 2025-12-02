import { parseFile, positiveMod } from './utils.js'

function getStopsAtZero(rotations: string[]) {
  function parseRotation(rotation: string) {
    const distance = Number(rotation.slice(1))
    return rotation[0] === 'R' ? distance : -distance
  }

  let curr = 50
  let count = 0

  for (const rot of rotations) {
    curr = positiveMod(curr + parseRotation(rot), 100)
    if (curr === 0) count++
  }

  return count
}

console.log(getStopsAtZero(await parseFile('1.secret-entrance/example.txt')))
