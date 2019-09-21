const http = require('http');
const app = require('./server-app');

const server = http.createServer(app.default);

const PORT = process.env.PORT || 8085;

server.listen(PORT, function(){
    console.log(`App server listening on ${PORT}`);
});