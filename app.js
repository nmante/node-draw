// Including libraries

//var app = require('http').createServer(handler);
var express = require('express'), 
        path = require('path'),
    static = require('node-static'); // for serving files

var app = express();
// This will make all the files in the current folder
// accessible from the web

app.use(express.static(path.join(__dirname, 'public')));

//module.exports = app;
app.set('port', process.env.PORT || 3000);
app.set('host', process.env.HOST || "127.0.0.1");


var server = require('http').Server(app);

var io = require('socket.io')(server);
server.listen(app.get('port'), app.get('host'), function() {
	        console.log('Express server listening on port ' + server.address().port);

});
	

// Delete this row if you want to see debug messages
io.set('log level', 1);

// Listen for incoming connections from clients
io.sockets.on('connection', function (socket) {

    // Start listening for mouse move events
    socket.on('mousemove', function (data) {

        // This line sends the event (broadcasts it)
        // to everyone except the originating client.
        socket.broadcast.emit('moving', data);
    });
});
