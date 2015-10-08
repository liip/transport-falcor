var model = require('../models');

console.log('momma');

model.get('hello').then((res) => {
  console.log(res.json.hello);
});