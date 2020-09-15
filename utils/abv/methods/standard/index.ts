import { AbvParams } from '../../types';

const calculateStandardAbv = ({ finalGravity, originalGravity }: AbvParams) => {
  return (originalGravity - finalGravity) * 131.25;
};

export default calculateStandardAbv;
