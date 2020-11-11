export const hexToRgb = (h) => {
  h = h.toString();
  let r = 0;
  let g = 0;
  let b = 0;

  if (h.length === 4) {
    r = parseInt("0x" + h[1] + h[1], 16);
    g = parseInt("0x" + h[2] + h[2], 16);
    b = parseInt("0x" + h[3] + h[3], 16);
  } else if (h.length === 7) {
    r = parseInt("0x" + h[1] + h[2], 16);
    g = parseInt("0x" + h[3] + h[4], 16);
    b = parseInt("0x" + h[5] + h[6], 16);
  }

  return { red: r, green: g, blue: b };
};

const buildGradientBackground = (hex) => {
  let rgb = hexToRgb(hex);

  return "background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);";
};

const adjustGamma = (val) => {
  return Math.pow((val + 0.055) / 1.055, 2.4);
};

export const getLuminance = (r, g, b) => {
  const rsrgb = r / 255;
  const gsrgb = g / 255;
  const bsrgb = b / 255;
  const lowc = 1 / 12.92;

  const rc = 0.2126;
  const gc = 0.7152;
  const bc = 0.0722;

  const red = rsrgb <= 0.03928 ? rsrgb * lowc : adjustGamma(rsrgb);
  const green = gsrgb <= 0.03928 ? gsrgb * lowc : adjustGamma(gsrgb);
  const blue = bsrgb <= 0.03928 ? bsrgb * lowc : adjustGamma(bsrgb);

  return red * rc + green * gc + blue * bc;
};
