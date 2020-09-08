export type Grams = number;

export type Liters = number;

export type Minutes = number;

export interface IbuParams {
  alphaAcids: number;
  batchVolume: Liters;
  boilTime: Minutes;
  hopWeight: Grams;
  originalGravity: number;
}
