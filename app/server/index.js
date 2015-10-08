var falcorExpress = require('falcor-express')
  , bodyParser = require('body-parser')
  , Router = require('falcor-router')
  , express = require('express');

var app = express();
var routes = require('./routes');

app.use(bodyParser.text({ type: 'text/*' }));
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    return new Router(routes);
}));

app.use(express.static('./public'));

var server = app.listen(8000, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("navigate to http://localhost:8000")
});
