const scale = module.exports.scale = function (number, fromMax, toMax = 255) {
  return Math.round(number * toMax / fromMax);
};
