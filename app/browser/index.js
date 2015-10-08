var model = require('../models');

model.get(['locations', 'foo', {from: 2, to: 5}, ['id', 'name']])
  .then((res) => {
    console.log(res.json);
  })
  .catch((err) => {
    console.error(err);
  })
;
