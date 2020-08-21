import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import UserList from './UserList'
import crudAPI from '../API/crudAPI'
import ToastContext from '../contexts/toastContext'

export default function FormDialog() {
  const [state, setState] = React.useState({
    open: false,
    user: undefined,
  });

  let password = '';
  let confirmPassword = '';

  const handleClickOpen = (data) => {
    setState({
      open: true,
      user: data,
    });
  }

  const handleClose = () => {
    setState({
      open: false,
      user: undefined,
    });
  };

  const contextValue = React.useContext(ToastContext)

  const handleSavePassword = () => {
    if (password === confirmPassword) {
      const bcrypt = require('bcryptjs')

      state.user.password = bcrypt.hashSync(password)

      crudAPI.edit('user', state.user)

      contextValue.toast('Mot de passe modifé');

      setState({
        open: false,
        user: undefined,
      });
    } else {
      // TODO
    }
  };

  return (
    <div>
      <Dialog open={state.open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Changer le mot de passe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Faites attention à garder les mots de passe privés.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Mot de passe"
            type="password"
            onChange={(event) => password = event.target.value}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="confirm_password"
            label="Confirmer le mot de passe"
            type="password"
            onChange={(event) => confirmPassword = event.target.value}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleSavePassword} color="primary">
            Valider
          </Button>
        </DialogActions>
      </Dialog>
      <UserList onClick={handleClickOpen} />
    </div>
  );
}