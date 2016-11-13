// http://stackoverflow.com/a/9744576
export function padLeft(number, padLength, padChar = '0') {
  const pad = new Array(1 + padLength).join(padChar);
  return (pad + number).slice(-Math.max(pad.length, number.toString().length));
}
