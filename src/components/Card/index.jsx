import React from 'react';
import debounce from 'lodash/debounce';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FlipCard from '../FlipCard';
import SimpleCard from '../SimpleCard';

export default function Card(props) {
    const classes = useStyles();
    // const [{ isFlipped }, setState] = React.useState({ isFlipped: false });

    // const showBack = debounce(() => setState({ isFlipped: true }), 150);
    // const showFront = debounce(() => setState({ isFlipped: false }), 150);
    const toggleCard = debounce(() => {
        props.flipCard();
    }, 150);

    return (
        <div className={classes.paper}>
            <FlipCard isFlipped={props.side === 'front'}>
                <Paper className={clsx(classes.main, classes.card)} {/*onClick={toggleCard}*/}>
                    <SimpleCard />
                </Paper>
                <Paper className={clsx(classes.other, classes.card)} {/*onClick={toggleCard}*/}>
                    <SimpleCard type={props.type} />
                </Paper>
            </FlipCard>
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    paper: {
        cursor: 'pointer',
        height: 344,
        width: 224,
    },
    card: {
        userSelect: 'none',
        borderRadius: 10,
        padding: theme.spacing(2),
        height: '100%',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    main: {

    },
    other: {
        color: theme.palette.text.secondary,
    },
    tags: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        color: '#ccc',
    }
}));
