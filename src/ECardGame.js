import { Game, TurnOrder } from 'boardgame.io/core';

const getVictoryState = (board) => {
  if (board.length === 2) {
    const slaveCard = board[1];
    const emperorCard = board[0];

    if (slaveCard.side !== 'front' || emperorCard.side !== 'front') {
      return {
        isVictory: false,
        winner: undefined,
      };
    }

    switch (true) {
      case slaveCard.name === 'slave' && emperorCard.name === 'emperor':
        return {
          isVictory: true,
          winner: 1,
        };
      case slaveCard.name === 'slave' && emperorCard.name === 'citizen':
        return {
          isVictory: true,
          winner: 0,
        };
      case slaveCard.name === 'citizen' && emperorCard.name === 'emperor':
        return {
          isVictory: true,
          winner: 0,
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
  0: [{...CitizenCard, id: 5}, {...CitizenCard, id: 6}, {...CitizenCard, id: 7}, {...CitizenCard, id: 8}, EmperorCard],
  1: [{...CitizenCard, id: 1}, {...CitizenCard, id: 2}, {...CitizenCard, id: 3}, {...CitizenCard, id: 4}, SlaveCard],
};

export const ECardGame = Game({
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
    TurnOrder: {
      ...TurnOrder.DEFAULT,
      first: () => {
        return 1;
      },
    },

    movesPerTurn: 1,

    startingPhase: 'play',

    phases: {
      play: {
        allowedMoves: ['playCard'],
        endPhaseIf: (G) => {
          const shownCardCount = G.board.reduce((acc, card) => {
            if (card.side === 'front') {
              return acc + 1;
            }
            return acc;
          }, 0);

          if (shownCardCount === 2) {
            const state = getVictoryState(G.board);
            if (!state.isVictory) {
              G.board = [];
            }
          }

          return G.board.length === 2;
        },
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

          return shownCardCount === 2;
        },
        next: 'play',
      },
    },

    endTurnIf: (G, ctx) => {
      return { next: ctx.turn + 1 }
    },

    endGameIf: (G, ctx) => {
      const state = getVictoryState(G.board);
      if (state.isVictory) {
        return { winner: state.winner };
      }
    }
  }
});
