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

export const getLuminance = (r, g, b) => {
  var a = [r, g, b].map(function (v) {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};
