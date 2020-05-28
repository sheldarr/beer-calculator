const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({
  greatOldOnes: [
    'Bokrug',
    'Cthulhu',
    'Cthugha',
    'Dagon',
    'Glaaki',
    'Golgoroth',
    'Hastur',
    'Idh-yaa',
    'Ithaqua',
    'Nyogtha',
    'Shudde M’ell',
    'Tsathoggua',
    'Yig',
    'Zulchequon',
  ],
}).write();

const getGreatOldOnes = () => {
  return db.get('greatOldOnes').value();
};

module.exports = {
  getGreatOldOnes,
};
