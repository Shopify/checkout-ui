export function rem(target: number, root = 10) {
  return `${target / root}rem`;
}

export function pixelOrPercent(number: number) {
  return number > 1 ? rem(number) : `${number * 100}%`;
}
