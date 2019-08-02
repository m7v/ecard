import React from 'react';
import { Client } from 'boardgame.io/react';
import { TicTacToeGame } from './TicTacToeGame';
import { TicTacToeBoard } from './TicTacToeBoard';

const TicTacToeClient = Client({
  game: TicTacToeGame,
  board: TicTacToeBoard,
  multiplayer: { server: 'localhost:8000' },
});

class App extends React.Component {
  state = { playerID: null };

  render() {
    if (this.state.playerID === null) {
      return (
        <div>
          <p>Play as</p>
          <button onClick={() => this.setState({ playerID: "0" })}>
            Slave
          </button>
          <button onClick={() => this.setState({ playerID: "1" })}>
            Emperor
          </button>
        </div>
      );
    }

    return (
      <div>
        <TicTacToeClient playerID={this.state.playerID} />
      </div>
    );
  }
};

export default App;
