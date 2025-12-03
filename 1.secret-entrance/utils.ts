// % is the remainder operator in JS
export function positiveMod(n: number, m: number) {
  return ((n % m) + m) % m
}
