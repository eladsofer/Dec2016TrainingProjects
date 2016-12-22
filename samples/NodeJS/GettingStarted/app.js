var http = require('http'); // import the http package

// start a web server listening on port 80
http.createServer(function(req, res) {

	// send http content type and status code
     res.writeHead(200, {'Content-Type': 'text/plain'});

	// send http content type and status code
     res.end('Hola Mundo!');

}).listen(80);

// just a console message
console.log('Server running on port 80');
