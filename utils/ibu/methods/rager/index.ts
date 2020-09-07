import { Grams, Liters, Minutes } from '../../types';

const BOIL_TIME_ADJUSTMENT = 31.32;

interface RagerParams {
  batchVolume: Liters;
  boilTime: Minutes;
  alphaAcids: number;
  hopWeight: Grams;
  originalGravity: number;
}

const calculateUtilization = (boilTime: Minutes) => {
  return 18.11 + 13.86 * Math.tanh((boilTime - BOIL_TIME_ADJUSTMENT) / 18.27);
};

const calculateGravityAdjustment = (originalGravity: number) => {
  return originalGravity > 1.05 ? (originalGravity - 1.05) / 0.2 : 0;
};

const calculateRager = ({
  batchVolume,
  boilTime,
  alphaAcids,
  hopWeight,
  originalGravity,
}: RagerParams) => {
  return (
    (hopWeight * calculateUtilization(boilTime) * alphaAcids * 1000) /
    (batchVolume * (1 + calculateGravityAdjustment(originalGravity)))
  );
};

export default calculateRager;
