const http = require('http');
const app = require('./server-app');

const server = http.createServer(app.default);

const PORT = 8085;

server.listen(PORT, function(){
    console.log(`App listening on ${PORT}`);
});