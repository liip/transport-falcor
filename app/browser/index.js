var model = require('../models');

console.log('momma');

model.get('locations["foo"]["id", "name"]').then((res) => {
  console.log(res.json);
});