import { NextApiRequest, NextApiResponse } from 'next';

export interface PredefinedYeast {
  fermantaion: 'bottom' | 'top';
  name: string;
}

const YEASTS: PredefinedYeast[] = [
  {
    fermantaion: 'bottom',
    name: 'Saflager S-23',
  },
  {
    fermantaion: 'bottom',
    name: 'Saflager W-34/70',
  },
  {
    fermantaion: 'top',
    name: 'Safale S-04',
  },
  {
    fermantaion: 'top',
    name: 'Safale US-05',
  },
];

export default (
  req: NextApiRequest,
  res: NextApiResponse<PredefinedYeast[]>,
) => {
  res.status(200).json(YEASTS);
};
