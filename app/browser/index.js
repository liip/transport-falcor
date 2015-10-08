var model = require('../models');

console.log('momma');

model.get('locations["foo"][0..]["id", "name"]')
  .then((res) => {
    console.log(res.json);
  })
  .catch((err) => {
    console.error(err);
  })