export function scale(number, fromMax, toMax = 255) {
  return Math.round((number * toMax) / fromMax);
}
