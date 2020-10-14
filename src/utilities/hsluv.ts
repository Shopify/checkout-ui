/* eslint id-length: off */

// A minimal re-implementation of https://classic.yarnpkg.com/en/package/hsluv with
// minimal bloat and some helpful types

type Hue = number;
type Saturation = number;
type Lightness = number;

export type HslColorString = string;
export type RgbColorString = string;
export type HslColorTuple = [number, number, number];
export type YiqColorTuple = [number, number, number];

type Coordinate = [number, number, number];

const REF_Y = 1.0;
const REF_U = 0.19783000664283;
const REF_V = 0.46831999493879;

const MATRIX: [Coordinate, Coordinate, Coordinate] = [
  [3.240969941904521, -1.537383177570093, -0.498610760293],
  [-0.96924363628087, 1.87596750150772, 0.041555057407175],
  [0.055630079696993, -0.20397695888897, 1.056971514242878],
];
const KAPPA = 903.2962962;
const EPSILON = 0.0088564516;

export class Hsl {
  constructor(
    public readonly h: Hue,
    public readonly s: Saturation,
    public readonly l: Lightness,
  ) {}

  adjust({
    h,
    s,
    l,
  }: {
    h?(h: Hue): Hue;
    s?(s: Saturation): Saturation;
    l?(l: Lightness): Lightness;
  }) {
    return new Hsl(
      h?.(this.h) ?? this.h,
      s?.(this.s) ?? this.s,
      l?.(this.l) ?? this.l,
    );
  }

  toRgb() {
    return toRgb(this);
  }

  getYiqPerceivedBrightness() {
    return getYiqPerceivedBrightness(this);
  }
}

const HSL_REGEX = /hsl\(\s*(?<h>\d+),\s*(?<s>\d+)%,\s(?<l>\d+)%\)/;

export function parseHsl(color: HslColorString) {
  const match = color.match(HSL_REGEX);

  if (match == null) throw new Error(`Invalid HSL value: ${color}`);

  const {h, s, l} = match.groups as {h: string; s: string; l: string};
  const parsedHue = h ? parseInt(h, 10) : NaN;
  const parsedSaturation = s ? parseInt(s, 10) : NaN;
  const parsedLightness = l ? parseInt(l, 10) : NaN;

  if (
    Number.isNaN(parsedHue) ||
    Number.isNaN(parsedSaturation) ||
    Number.isNaN(parsedLightness)
  ) {
    throw new Error(`Invalid HSL value: ${color}`);
  }

  return new Hsl(parsedHue, parsedSaturation, parsedLightness);
}

export function toRgb({h, s, l}: Hsl): RgbColorString {
  return `rgb(${lchToRgb(...hsluvToLch(h, s, l)).join(',')})`;
}

export function getYiqPerceivedBrightness({h, s, l}: Hsl): number {
  const [y] = hsluvToYiq(h, s, l);

  return y;
}

/*
YIQ is the suggested color mode to determine sufficient contrast
between background and foreground colors. This is what is used
in Checkout Core (or C0).
- Core code: https://github.com/Shopify/shopify/blob/master/app/assets/stylesheets/checkout/helpers/_colors.scss#L88-L97
- W3 suggestion: https://www.w3.org/TR/AERT/#color-contrast
- RGB to YIQ: https://en.wikipedia.org/wiki/YIQ#From_RGB_to_YIQ
*/
function hsluvToYiq(h: Hue, s: Saturation, l: Lightness): YiqColorTuple {
  const [r, g, b] = lchToRgb(...hsluvToLch(h, s, l));

  return [
    (r * 0.299 + g * 0.587 + b * 0.114) / 255,
    (r * 0.596 - g * 0.275 - b * 0.321) / 255,
    (r * 0.212 - g * 0.523 + b * 0.311) / 255,
  ];
}

function lchToRgb(l: number, c: number, h: number): Coordinate {
  return xyzToRgb(...luvToXyz(...lchToLuv(l, c, h)));
}

function xyzToRgb(...xyz: Coordinate): Coordinate {
  return [
    toRgbChannel(fromLinear(dotProduct(MATRIX[0], xyz))),
    toRgbChannel(fromLinear(dotProduct(MATRIX[1], xyz))),
    toRgbChannel(fromLinear(dotProduct(MATRIX[2], xyz))),
  ];
}

function toRgbChannel(percentage: number) {
  return Math.round(percentage * 255);
}

function dotProduct(a: Coordinate, b: Coordinate) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function fromLinear(c: number) {
  if (c <= 0.0031308) {
    return 12.92 * c;
  } else {
    return 1.055 * c ** 0.416666666666666685 - 0.055;
  }
}

function lchToLuv(l: number, c: number, h: number): Coordinate {
  const hrad = (h / 360.0) * 2 * Math.PI;
  return [l, Math.cos(hrad) * c, Math.sin(hrad) * c];
}

function luvToXyz(l: number, u: number, v: number): Coordinate {
  if (l === 0) {
    return [0, 0, 0];
  }
  const varU = u / (13 * l) + REF_U;
  const varV = v / (13 * l) + REF_V;
  const y = lToY(l);
  const x = 0 - (9 * y * varU) / ((varU - 4) * varV - varU * varV);
  return [x, y, (9 * y - 15 * varV * y - varV * x) / (3 * varV)];
}

function lToY(l: number) {
  if (l <= 8) {
    return (REF_Y * l) / KAPPA;
  } else {
    return REF_Y * ((l + 16) / 116) ** 3;
  }
}

function hsluvToLch(h: Hue, s: Saturation, l: Lightness): Coordinate {
  if (l > 99.9999999) {
    return [100, 0, h];
  }
  if (l < 0.00000001) {
    return [0, 0, h];
  }
  const max = maxChromaForLH(l, h);
  const c = (max / 100) * s;
  return [l, c, h];
}

function maxChromaForLH(l: Lightness, h: Hue) {
  const hrad = (h / 360) * Math.PI * 2;
  const bounds = getBounds(l);

  return Math.min(
    ...bounds
      .map((bound) => lengthOfRayUntilIntersect(hrad, bound))
      .filter((length) => length > 0),
  );
}

interface Line {
  slope: number;
  intercept: number;
}

function lengthOfRayUntilIntersect(theta: number, line: Line) {
  return line.intercept / (Math.sin(theta) - line.slope * Math.cos(theta));
}

function getBounds(l: number): Line[] {
  const bounds: Line[] = [];
  const sub1 = (l + 16) ** 3 / 1560896;
  const sub2 = sub1 > EPSILON ? sub1 : l / KAPPA;

  for (const [m1, m2, m3] of MATRIX) {
    for (const t of [0, 1]) {
      const top1 = (284517 * m1 - 94839 * m3) * sub2;
      const top2 =
        (838422 * m3 + 769860 * m2 + 731718 * m1) * l * sub2 - 769860 * t * l;
      const bottom = (632260 * m3 - 126452 * m2) * sub2 + 126452 * t;
      bounds.push({slope: top1 / bottom, intercept: top2 / bottom});
    }
  }

  return bounds;
}
