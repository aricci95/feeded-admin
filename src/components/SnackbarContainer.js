import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import AppContext from '../contexts/toastContext'
import ResponsiveDrawer from './ResponsiveDrawer'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SnackbarContainer(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    open: false,
    text: '',
    type: 'success',
  });

  const toast = (text, type = 'success') => {
    setState({
      open: true,
      text: text,
      type: type,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState({
      open: false,
      text: undefined,
      type: 'success',
    });
  };

  const contextValue = {
    toast: toast
  }

  return (
    <div className={classes.root}>
      <AppContext.Provider value={contextValue}>
        <Snackbar open={state.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={state.type}>
            {state.text}
          </Alert>
        </Snackbar>
        <ResponsiveDrawer setAuthenticated={props.setAuthenticated}/>
      </AppContext.Provider>
    </div>
  );
}