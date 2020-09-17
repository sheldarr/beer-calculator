import { NextApiRequest, NextApiResponse } from 'next';

export interface PredefinedMalt {
  ebc: number;
  extract: number;
  name: string;
}

const MALTS: PredefinedMalt[] = [
  {
    ebc: 6.25,
    extract: 81.6,
    name: 'Pale Ale',
  },
];

export default (
  req: NextApiRequest,
  res: NextApiResponse<PredefinedMalt[]>,
) => {
  res.status(200).json(MALTS);
};
