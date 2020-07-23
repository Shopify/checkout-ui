const {basename} = require('path');

module.exports = {
  process(_, filename) {
    return `module.exports = ${JSON.stringify(basename(filename))};`;
  },
};
