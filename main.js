const PORT = 8080 || process.env.port;

const express = require('express');

let app = express();
let server = app.listen(PORT);

app.use(express.static('public'));

let io = require('socket.io').listen(server);

users = {};
class User
{
	/**
	 * 
	 * @param {string} name 
	 */
	constructor(name)
	{
		this.name = name;
	}
}

io.sockets.on('connection',
	(socket) =>
	{
		socket.on('play',
			name =>
			{
				users[socket.id] = new User(name);
			}
		);
		
		socket.on('disconnect',
			() =>
			{
				if(users[socket.id])
				{
					delete users[socket.id];
				}
			}
		);
	}
);