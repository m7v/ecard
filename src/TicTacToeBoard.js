import React from 'react';
import PropTypes from 'prop-types';
import './board.css';

const roles = [
  'Slave',
  'Emperor',
];

export class TicTacToeBoard extends React.Component {
  static propTypes = {
    G: PropTypes.any.isRequired,
    ctx: PropTypes.any.isRequired,
    moves: PropTypes.any.isRequired,
    playerID: PropTypes.string,
    isActive: PropTypes.bool,
    isMultiplayer: PropTypes.bool,
  };

  playCard = (card) => {
    this.props.moves.playCard(card);
  };

  showCard = (card) => {
    const { playerID } = this.props;
    if (playerID === card.playerId) {
      this.props.moves.showCard(card);
    }
  };

  render() {
    return (
      <div>
        {this.renderPhase()}
        {this.renderWinner()}
        <div />
        {this.renderBoard()}
        {this.renderCards()}
      </div>
    );
  }

  renderWinner = () => {
    const { ctx: { gameover } } = this.props;

    return (
        gameover && <div id="winner">Winner: {roles[gameover.winner]}</div>
    )
  };

  renderPhase = () => {
    const { ctx: { phase, gameover } } = this.props;

    const title = phase === 'play' ? 'Play one of your cards' : 'Flip your played card';

    if (gameover) {
      return undefined;
    }

    return (
        <div>
          {title}
        </div>
    );
  };

  renderCards = () => {
    const { G, playerID } = this.props;

    return (
        <div>
          <div>CARDS</div>
          {G.cards[playerID].map((card, key) => (
              <div key={`${card.name}${key}`} onClick={() => this.playCard(card)}>
                {JSON.stringify(card)}
              </div>
          ))}
        </div>
    )
  };

  renderBoard = () => {
    const { G } = this.props;

    return (
        <div>
          <div>BOARD</div>
          {G.board && G.board.map((card, key) => (
              <div key={`${card.name}${key}`} onClick={() => this.showCard(card)}>
                {JSON.stringify(card)}
              </div>
          ))}
        </div>
    )
  }
}
