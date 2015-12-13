var express = require('express'),
	router = express.Router(),
	fs = require('fs'),
	path = require('path');
	
router.get('/hospitals', function(req, res){
	var hospitals = fs.readFileSync(__dirname + '/../api/hospitals.json','utf8');
	var json = JSON.parse(hospitals);
	res.json(json);
});

router.get('/hospitals/:name', function(req, res){
	var hospitals = fs.readFileSync(__dirname + '/../api/hospitals.json','utf8');
	var name = req.params.name;
	console.log(name);
	var json = JSON.parse(hospitals);
	var output = json.filter(function(obj){
			var hospitalName  = obj.name.split(" ").join("-").toLowerCase();
			console.log(hospitalName);
			return hospitalName == name;
		}
	);
	console.log(output);
	res.json(output);
});

module.exports = router;