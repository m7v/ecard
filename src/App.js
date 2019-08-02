import React from 'react';
import { Client } from 'boardgame.io/react';
import { ECardGame } from './ECardGame';
import { ECardBoard } from './ECardBoard';
import SimpleCard from "./components/SimpleCard";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const ECardClient = Client({
  game: ECardGame,
  board: ECardBoard,
  debug: false,
  multiplayer: { server: '10.54.4.150:8000' },
});

function  App () {
    const classes = useStyles();
    const [{ playerID }, setState] = React.useState({ playerID: null });

    if (playerID === null) {
      return (
          <Card className={classes.flexContainer}>
              <Typography variant="h5" component="h2">
                  Play as
              </Typography>
              <div className={classes.wrapper}>
                  <SimpleCard type={'emperor'} handleClick={() => setState({ playerID: "0" })} />
                  <SimpleCard type={'slave'} handleClick={() => setState({ playerID: "1" })} />
              </div>
          </Card>
      );
    }

    return (
      <div>
        <ECardClient playerID={playerID} />
      </div>
    );
}

const useStyles =  makeStyles((theme) => ({
    flexContainer: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
    },
    wrapper: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default App;
