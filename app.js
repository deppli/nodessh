
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var ssh = require('./routes/ssh');
var st= require('./routes/sessiontest');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('nodessh'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.post('/ns/connect',ssh.connect);
app.get('/ns/refresh',ssh.refresh);
app.post('/ns/execute',ssh.execute);

app.get('/st',st.st);
app.get('/st2',st.st2);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
