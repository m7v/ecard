import { Game, TurnOrder } from 'boardgame.io/core';

const getVictoryState = (board) => {
  console.log('board', board);
  if (board.length === 2) {
    const firstCard = board[0].name;
    const secondCard = board[1].name;

    switch (true) {
      case firstCard === 'slave' && secondCard === 'emperor':
        return {
          isVictory: true,
          winner: 0,
        };
      case firstCard === 'slave' && secondCard === 'citizen':
        return {
          isVictory: true,
          winner: 1,
        };
      case firstCard === 'citizen' && secondCard === 'emperor':
        return {
          isVictory: true,
          winner: 1,
        };
      default:
        return {
          isVictory: false,
          winner: undefined,
        };
    }
  }

  return {
    isVictory: false,
    winner: undefined,
  };
};

const CitizenCard = {
  id: 0,
  name: 'citizen',
};

const EmperorCard = {
  id: 10,
  name: 'emperor',
};

const SlaveCard = {
  id: 9,
  name: 'slave',
};

const cards = {
  0: [{...CitizenCard, id: 1}, {...CitizenCard, id: 2}, {...CitizenCard, id: 3}, {...CitizenCard, id: 4}, SlaveCard],
  1: [{...CitizenCard, id: 5}, {...CitizenCard, id: 6}, {...CitizenCard, id: 7}, {...CitizenCard, id: 8}, EmperorCard],
};

export const TicTacToeGame = Game({
  name: 'e-card',

  setup: (G, ctx, game) => {
    return {
      cards,
      board: []
    }
  },

  moves: {
    playCard(G, ctx, playedCard) {
      const board = [...G.board];
      const cards = {...G.cards};

      board[ctx.currentPlayer] = { ...playedCard, playerId: ctx.currentPlayer, side: 'back' };
      cards[ctx.currentPlayer] = cards[ctx.currentPlayer].filter((card) => card.id !== playedCard.id);

      return { ...G, board, cards };
    },

    showCard(G, ctx, playedCard) {
      const board = [...G.board];

      board[ctx.currentPlayer] = { ...playedCard, side: 'front' };

      return { ...G, board };
    }
  },

  flow: {
    movesPerTurn: 1,

    startingPhase: 'play',

    phases: {
      play: {
        allowedMoves: ['playCard'],
        endPhaseIf: (G) => G.board.length === 2,
        next: 'show',
      },

      show: {
        allowedMoves: ['showCard'],
        endPhaseIf: (G) => {
          const shownCardCount = G.board.reduce((acc, card) => {
            if (card.side === 'front') {
              return acc + 1;
            }
            return acc;
          }, 0);

          if (shownCardCount === 2) {
            G.board = [];
          }

          return shownCardCount === 2;
        },
        next: 'play',
      },
    },

    endTurnIf: (G, ctx) => {
      if (!G.board.length) {
        return { next: ctx.turn + 1 }
      }
    },

    endGameIf: (G, ctx) => {
      const state = getVictoryState(G.board);

      console.log('state', state);

      if (state.isVictory) {
        return { winner: state.winner };
      }
    }
  }
});
