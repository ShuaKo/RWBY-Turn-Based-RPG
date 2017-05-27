
var express = require('express');
var consolidate = require('consolidate');
var bodyparser = require('body-parser');
var performQuery = require('./Database');

var app = express();

app.set('views', './views');

app.engine('html', consolidate.nunjucks);
app.use('/static', express.static('./static'));
app.use(bodyparser.urlencoded());
app.listen(3000, function () {
	console.log('Server is running on port 3000...')
});

app.get('/', function(request, respond){
	var score = request.query.highscore;
	if(score == undefined){
		respond.render('index.html',{
			highscore: 0
		});
	}else{
		respond.render('index.html',{
			highscore: score
		});
	}
});





