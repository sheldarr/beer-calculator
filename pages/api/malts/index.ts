import { NextApiRequest, NextApiResponse } from 'next';

export interface PredefinedMalt {
  ebc: number;
  extract: number;
  name: string;
}

const MALTS: PredefinedMalt[] = [
  {
    ebc: 900,
    extract: 67,
    name: 'Czekoladowy ciemny',
  },
  {
    ebc: 200,
    extract: 75,
    name: 'Karmelowy 200',
  },
  {
    ebc: 22,
    extract: 78,
    name: 'Monachijski ciemny',
  },
  {
    ebc: 6.25,
    extract: 81.6,
    name: 'Pale Ale',
  },
  {
    ebc: 3.65,
    extract: 80,
    name: 'Pilzneński',
  },
  {
    ebc: 70,
    extract: 75,
    name: 'Red Ale',
  },
];

export default (
  req: NextApiRequest,
  res: NextApiResponse<PredefinedMalt[]>,
) => {
  res.status(200).json(MALTS);
};
