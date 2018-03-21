export default (number, fromMax, toMax = 255) => Math.round((number * toMax) / fromMax);
