export const calculatePlatoToOg = (plato: number) => {
  return 1 + plato / (258.6 - 227.1 * (plato / 258.2));
};

export const ebcToSrm = (ebc: number) => {
  return ebc * 0.508;
};

export const srmToEbc = (srm: number) => {
  return srm * 1.97;
};

export const srmToLovibond = (srm: number) => {
  return (srm + 0.76) / 1.3546;
};

export const mcuToSrmMorey = (mcu: number) => {
  return 1.4922 * Math.pow(mcu, 0.6859);
};

export const kgToLbs = (kg: number) => {
  return kg * 2.20462;
};
export const lToGal = (l: number) => {
  return l * 0.264172;
};
