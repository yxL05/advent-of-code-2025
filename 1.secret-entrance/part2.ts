import { parseFile, positiveMod } from './utils.js'

function getPassesByZero(rotations: string[]) {
  function parseRotation(rotation: string) {
    const distance = Number(rotation.slice(1))
    return rotation[0] === 'R' ? distance : -distance
  }

  let prev: number = 50
  let curr
  let count = 0

  for (const rot of rotations) {
    const diff = parseRotation(rot)
    curr = prev + diff

    // Does not matter if you were positive or negative before
    if (curr === 0) {
      count++
      prev = 0
      continue
    }

    if (prev === 0) {
      count += Math.trunc(Math.abs(curr / 100))
    } else {
      if (curr >= 100) {
        count += Math.trunc(curr / 100)
      } else if (curr < 0) {
        count += Math.trunc(Math.abs(curr / 100)) + 1
      }
    }

    prev = positiveMod(curr, 100)
  }

  return count
}

const input = await parseFile('1.secret-entrance/input.txt')
console.log(getPassesByZero(input))
