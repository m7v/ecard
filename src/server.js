const Server = require('boardgame.io/server').Server;
const server = Server({ games: [require('./ECardGame').ECardGame] });
server.run(8000);
