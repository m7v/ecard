import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import slave from './slave.png';
import emperor from './emperor.png';
import citizen from './citizen.png';
import back from './back.png';

export default function SimpleCard(props) {
    const classes = useStyles();
    const getCardContent = () => {
        if (props.type === 'slave') {
            return slave;
        }
        if (props.type === 'emperor') {
            return emperor;
        }
        if (props.type === 'citizen') {
            return citizen;
        }
        return back;
    };

    const handleClick = () => {
        if (props.handleClick) {
            props.handleClick();
        }
    };

    return (
        <div className={classes.paper} onClick={handleClick}>
            <div className={classes.paper}>
                <img src={getCardContent()} alt="" className={classes.paper} />
            </div>
        </div>
    )
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
