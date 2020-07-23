export function modularScale(
  point: number,
  base: number | string,
  ratio: number | string = 1.285,
) {
  const baseValue = typeof base === 'string' ? parseFloat(base) : base;
  const ratioValue = typeof ratio === 'string' ? parseFloat(ratio) : ratio;

  return `${ratioValue ** point * (baseValue / 10)}rem`;
}
