var pg = require('pg');

var pool = new pg.Pool({
	user: 'pgdemo',
	password: 'pgdemo',
	name: 'pgdemo',
	host: 'localhost',
	port: 5432,
	max: 10
});

function performQuery(query){
	pool.connect(function(err, client, done) {
		client.query(query, function(err, results){
			console.log(err);
			console.log(results);
			done();
		});
	});
}

module.exports = performQuery;