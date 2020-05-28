const { getGreatOldOnes } = require('../../db');

module.exports = (req, res) => {
  const greatOldOnes = getGreatOldOnes();

  return res.send(greatOldOnes);
};
