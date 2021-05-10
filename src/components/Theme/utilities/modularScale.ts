export function modularScale(
  point: number,
  base: number | string,
  ratio: number | string = 1.285,
  unit: 'rem' | 'ms' = 'rem',
) {
  const baseValue = typeof base === 'string' ? parseFloat(base) : base;
  const ratioValue = typeof ratio === 'string' ? parseFloat(ratio) : ratio;

  const normalizedValue = unit === 'rem' ? baseValue / 10 : baseValue;

  return `${ratioValue ** point * normalizedValue}${unit}`;
}
