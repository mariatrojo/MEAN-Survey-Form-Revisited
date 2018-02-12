var express = require('express');
var path = require("path");
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./static")));
app.set('views', path.join(__dirname, './views'));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render("index");
});

var server = app.listen(8000, function() {
	console.log("Survey Form Revisited on port 8000!")
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
	console.log("Client/socket is connected!");
	console.log("Client/socket id is ", socket.id);

	socket.on("posting_form", function (data){
		console.log('Someone clicked a button!')

		console.log(data);
		data['num'] = Math.floor(Math.random() * 1001);
		socket.emit('server', data);

		// newobj = {
		// 	name: data.name,
		// 	location: data.location,
		// 	language: data.language,
		// 	comment: data.comment,
		// 	number: Math.floor(Math.random()*1001)
		// }
		// socket.emit("server_response", newobj)
	});

	// socket.on("random_number", function (data){
	// 	socket.emit('server_response', {response:(Math.random() * 1001)});
	// });

});

