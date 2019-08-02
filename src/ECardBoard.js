import React from 'react';
import './board.css';
import SimpleCard from './components/SimpleCard';
// import Card from './components/Card';
import { makeStyles } from '@material-ui/core';
import clsx from "clsx";

const roles = [
  'Emperor',
  'Slave',
];

export function ECardBoard(props) {
  const classes = useStyles();

  const playCard = (card) => {
    props.moves.playCard(card);
  };

  const showCard = (card) => {
    const { playerID } = props;
    if (playerID === card.playerId) {
      props.moves.showCard(card);
    }
  };

  const renderWinner = () => {
    const { ctx: { gameover } } = props;

    return (
        gameover && <div id="winner">Winner: {roles[gameover.winner]}</div>
    )
  };

  const renderPhase = () => {
    const { playerID, ctx: { phase, currentPlayer, gameover } } = props;

    let title = '';

    if (playerID === currentPlayer) {
      title = phase === 'play'
          ? `${roles[currentPlayer]}: Play one of your cards`
          : `${roles[currentPlayer]}: Flip your played card`;
    } else {
      title = 'Waiting for opponent...'
    }

    if (gameover) {
      return undefined;
    }

    return (
        <div>
          {title}
        </div>
    );
  };

  const renderCards = () => {
    const { G, playerID } = props;

    return (
        <div className={classes.wrapperCards}>
          {G.cards[playerID].map((card, key) => (
              <div
                  key={`${card.name}${key}`}
                  onClick={() => playCard(card)}
              >
                <SimpleCard type={card.name} />
              </div>
          ))}
        </div>
    )
  };

  const renderBoard = () => {
    const { G, ctx, playerID } = props;

    return (
        <div className={classes.wrapperTable}>
          {G.board && G.board.map((card, key) => (
              <div
                  key={`${card.name}${key}`}
                  className={clsx(ctx.currentPlayer === playerID && playerID === card.playerId && classes.hover)}
                  onClick={() => showCard(card)}
              >
                <SimpleCard type={card.side === 'front' ? card.name : undefined} />
              </div>
          ))}
        </div>
    )
  };

  return (
      <div className={classes.wrapperBoard}>
        {renderPhase()}
        {renderWinner()}
        <div />
        {renderBoard()}
        {renderCards()}
      </div>
  );
}

const useStyles =  makeStyles((theme) => ({
  wrapperCards: {
    display: 'flex',
    position: 'fixed',
    bottom: 0,
  },
  wrapperBoard: {
    display: 'flex',
    position: 'fixed',
    height: '100vh',
  },
  wrapperTable: {
    display: 'flex',
    justifyContent: 'space-between',
    width: 600,
  },
  hover: {
    height: 344,
    boxShadow: '0 14px 28px rgba(255,0,0,0.55), 0 10px 10px rgba(255,0,0,0.52)',
  },
}));
