var express = require('express'),
	app = express(),
	path = require('path'),
	fs = require('fs');
	
var routes = require('./routes/index');
var hospitals = require('./routes/hospitals');

app.set('views', path.join(__dirname, '/views'));
//app.set('view engine', 'ejs');

var port = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '/bower_components')));

// app.use('/', function(req, res){
//   res.sendFile(path.join(__dirname, '/public/index.html'));
// });

//app.use('/', routes);
app.use('/api', hospitals);


// app.get('/*', function(req, res) {
// 	res.redirect('/');
// });

app.listen(port, function(){
    console.log('Express server listening on port ' + port);
});