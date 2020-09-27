import { NextApiRequest, NextApiResponse } from 'next';

export interface PredefinedHop {
  alphaAcids: number;
  name: string;
}

const HOPS: PredefinedHop[] = [
  {
    alphaAcids: 5.8,
    name: 'Cascade',
  },
  {
    alphaAcids: 5.2,
    name: 'Hallertauer Tradition',
  },
  {
    alphaAcids: 9.4,
    name: 'Iunga',
  },
  {
    alphaAcids: 5,
    name: 'Lomik',
  },
  {
    alphaAcids: 6,
    name: 'Lubelski',
  },
  {
    alphaAcids: 6.7,
    name: 'Marynka',
  },
  {
    alphaAcids: 7.1,
    name: 'Oktawia',
  },
  {
    alphaAcids: 3.5,
    name: 'Saaz',
  },
  {
    alphaAcids: 6.2,
    name: 'Sybilla',
  },
  {
    alphaAcids: 14.4,
    name: 'Zeus',
  },
];

export default (req: NextApiRequest, res: NextApiResponse<PredefinedHop[]>) => {
  res.status(200).json(HOPS);
};
