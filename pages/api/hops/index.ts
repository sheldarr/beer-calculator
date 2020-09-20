import { NextApiRequest, NextApiResponse } from 'next';

export interface PredefinedHop {
  alphaAcids: number;
  name: string;
}

const HOPS: PredefinedHop[] = [
  {
    alphaAcids: 6.7,
    name: 'Marynka',
  },
];

export default (req: NextApiRequest, res: NextApiResponse<PredefinedHop[]>) => {
  res.status(200).json(HOPS);
};
