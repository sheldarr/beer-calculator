/* eslint-disable sort-keys */

const MIN_SRM_VALUE = 1;
const MAX_SRM_VALUE = 40;

const hexColorsForSrm = {
  1: '#ffe699',
  2: '#ffd878',
  3: '#ffca5a',
  4: '#ffbf42',
  5: '#fbb123',
  6: '#f8a600',
  7: '#f39c00',
  8: '#ea8f00',
  9: '#e58500',
  10: '#de7c00',
  11: '#d77200',
  12: '#cf6900',
  13: '#cb6200',
  14: '#c35900',
  15: '#bb5100',
  16: '#b54c00',
  17: '#b04500',
  18: '#a63e00',
  19: '#a13700',
  20: '#9b3200',
  21: '#952d00',
  22: '#8e2900',
  23: '#882300',
  24: '#821e00',
  25: '#7b1a00',
  26: '#771900',
  27: '#701400',
  28: '#6a0e00',
  29: '#660d00',
  30: '#5e0b00',
  31: '#5a0a02',
  32: '#600903',
  33: '#520907',
  34: '#4c0505',
  35: '#470606',
  36: '#440607',
  37: '#3f0708',
  38: '#3b0607',
  39: '#3a070b',
  40: '#36080a',
};

const getHexColorForSrm = (srm: number) => {
  const roundedSrm = Math.round(srm);
  const clampedSrm = Math.min(
    Math.max(roundedSrm, MIN_SRM_VALUE),
    MAX_SRM_VALUE,
  );

  return hexColorsForSrm[clampedSrm];
};

export default getHexColorForSrm;
