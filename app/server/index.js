var falcorExpress = require('falcor-express')
  , bodyParser = require('body-parser')
  , Router = require('falcor-router')
  , express = require('express');


var app = express();

app.use(bodyParser.text({ type: 'text/*' }));
app.use('/model.json', falcorExpress.dataSourceRoute(function(req, res) {
    return new Router([
      {
        route: 'hello',
        get: function() {
          return { path: ['hello'], value: 'hello world' }
        }
      }
    ]);
}));

app.use(express.static('./public'));

var server = app.listen(8000, function(err) {
    if (err) {
        console.error(err);
        return;
    }

    console.log("navigate to http://localhost:8000")
});