var model = require('../models');

model.get('locations["Bern"][0..5].departures[0..5]["to"]')
  .then((res) => {
    console.log(res.json);
  })
  .catch((err) => {
    console.error(err);
  })
;
