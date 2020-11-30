const http = require('http');
const app = require('./app');

const server = http.createServer(app);

const port = 4000 || process.env.PORT;

server.listen(port, () => console.log("Listening on port:", port));

