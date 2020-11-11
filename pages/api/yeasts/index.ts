import { NextApiRequest, NextApiResponse } from 'next';

const YEASTS: string[] = [
  'Saflager S-23',
  'Saflager W-34/70',
  'Safale S-04',
  'Safale US-05',
];

export default (req: NextApiRequest, res: NextApiResponse<string[]>) => {
  res.status(200).json(YEASTS);
};
