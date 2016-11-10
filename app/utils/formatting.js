// http://stackoverflow.com/a/9744576
const padLeft = module.exports.padLeft = function (number, padLength, padChar) {
  padChar = (typeof padChar !== 'undefined') ? padChar : '0';
  const pad = new Array(1 + padLength).join(padChar);
  return (pad + number).slice(-Math.max(pad.length, number.toString().length));
};
