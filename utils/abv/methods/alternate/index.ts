import { AbvParams } from '../../types';

const calculateAlternateAbv = ({
  finalGravity,
  originalGravity,
}: AbvParams) => {
  return (
    ((76.08 * (originalGravity - finalGravity)) / (1.775 - originalGravity)) *
    (finalGravity / 0.794)
  );
};

export default calculateAlternateAbv;
