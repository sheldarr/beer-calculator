const calculatePlatoToOG = (plato: number) => {
  return 1 + plato / (258.6 - 227.1 * (plato / 258.2));
};

export default calculatePlatoToOG;
