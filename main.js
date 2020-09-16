const PORT = 8080 || process.env.port;

const express = require('express');

let app = express();
let server = app.listen(PORT);

app.use(express.static('public'));

let io = require('socket.io').listen(server);

io.sockets.on('connection',
	(socket) =>
	{
		console.log(socket.id);
	}
);