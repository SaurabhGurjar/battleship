export function capitalize(str) {
  const strArr = str.split("");
  return [].concat([strArr[0].toUpperCase()], strArr.slice(1)).join("");
}

export function createId(name) {
  return name.split(" ").join("");
}
