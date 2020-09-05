const ADDED_ALPHA_ACIDS_FACTOR = 1000;

const BIGNESS_FACTOR = 1.65;
const BIGNESS_BASE = 0.000125;

const BOIL_CURVE_SHAPE = 0.04;
const BOIL_MAX_UTILIZATION = 4.15;

type Grams = number;
type Liters = number;
type Minutes = number;

interface TinsethParams {
  batchVolume: Liters;
  boilTime: Minutes;
  decimalAlphaAcids: number;
  hopWeight: Grams;
  originalGravity: number;
}

const calculateAddedAlphaAcids = (
  decimalAlphaAcids: number,
  hopWeight: number,
  batchVolume: number,
) => {
  return (
    (decimalAlphaAcids * hopWeight * ADDED_ALPHA_ACIDS_FACTOR) / batchVolume
  );
};

const calculateBignessFactor = (originalGravity: number) => {
  return BIGNESS_FACTOR * Math.pow(BIGNESS_BASE, originalGravity - 1);
};

const calculateBoilTimeFactor = (boilTime: number) => {
  return (1 - Math.exp(-BOIL_CURVE_SHAPE * boilTime)) / BOIL_MAX_UTILIZATION;
};

const calculateDecimalAlphaAcidUtilization = (
  originalGravity: number,
  boilTime: number,
) => {
  return (
    calculateBignessFactor(originalGravity) * calculateBoilTimeFactor(boilTime)
  );
};

const calculateTinseth = ({
  batchVolume,
  boilTime,
  decimalAlphaAcids,
  hopWeight,
  originalGravity,
}: TinsethParams) => {
  return (
    calculateDecimalAlphaAcidUtilization(originalGravity, boilTime) *
    calculateAddedAlphaAcids(decimalAlphaAcids, hopWeight, batchVolume)
  );
};

export default calculateTinseth;
