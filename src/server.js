const http = require('http');
const fs = require('fs');
const path = require('path');

const serverPort = process.env.SERVER_PORT || 3000;
const ext = /[\w\d_-]+\.[\w\d]+$/;
const indexHtmlPath = path.join(__dirname, 'index.html');
const notFoundHtmlPath = path.join(__dirname, '404.html');

main();

function main() {
	http
		.createServer((req, res) => onRequest(req, res))
		.listen(serverPort, (err) => onListen(err));
}

function onRequest(req, res) {
	console.log(req.url);
	handleRequest(req, res);
}

function onListen(err) {
	if (!err) {
		console.log(`Listening on port ${serverPort}`);
	} else {
		console.error(err);
	}
}

function handleRequest(req, res) {
	let requestUrl = req.url;

	if (requestUrl === '/') {
		serveIndex(res);
	} else if (ext.test(requestUrl)) {
		let fileUrl = path.join(__dirname, requestUrl);
		serveDocument(fileUrl, res);
	} else {
		notFound(res);
	}
}

function serveIndex(res) {
	res.writeHead(200);
	fs.createReadStream(indexHtmlPath).pipe(res);
}

function serveDocument(fileUrl, res) {
	fs.exists(fileUrl, (exists) => {
		if (exists) {
			res.writeHead(200, {'Content-Type': 'text/html'});
			fs.createReadStream(fileUrl).pipe(res);
		} else {
			notFound(res);
		}
	});
}

function notFound(res) {
	res.writeHead(404, {'Content-Type': 'text/html'});
	fs.createReadStream(notFoundHtmlPath).pipe(res);
}
