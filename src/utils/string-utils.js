export function capitalize(str) {
  const strArr = str.split("");
  return [].concat([strArr[0].toUpperCase()], strArr.slice(1)).join("");
}
