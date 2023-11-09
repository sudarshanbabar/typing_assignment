import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop: '40vh',
    marginLeft: '47vw',
    position: 'fixed',
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
    zIndex: 999,
    overflow: 'hidden',
  },
  rootWithLabel: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    marginTop: '40vh',
    marginLeft: '40vw',
    position: 'fixed',
    backgroundColor: 'transparent',
    height: '100vh',
    width: '100vw',
    zIndex: 999,
    overflow: 'hidden',
  },
  loaderLabel: {
    padding: 10,
    width: 184,
    position: 'absolute',
    textAlign: 'center',
  },
  loaderBg: {
    border: '1px solid black',
    backgroundColor: 'white',
    height: 'max-content',
    width: 300,
    padding: 20,
  },
}));

const Loader = (props) => {
  const classes = useStyles();

  console.log(props.label);

  return props.label ? (
    <div className={classes.rootWithLabel}>
      <div className={classes.loaderBg}>
        <CircularProgress />
        <span className={classes.loaderLabel}>{props.label}</span>
      </div>
    </div>
  ) : (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

export default Loader;
