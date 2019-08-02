const Server = require('boardgame.io/server').Server;
const TicTacToeGame = require('./TicTacToeGame').TicTacToeGame;
const server = Server({ games: [TicTacToeGame] });
server.run(8000);