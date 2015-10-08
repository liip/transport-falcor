// var falcor = require('falcor')
//   , HttpDataSource = require('falcor/lib/HttpDataSource');

var test = new falcor.Model({
    source: new falcor.HttpDataSource('/model.json')
});

module.exports = test;