import React from 'react'
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function TableNumberInput() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="table_number"
          label="Numéro"
          type="number"
          defaultValue={1}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <TextField
          id="table_slots"
          label="Places"
          defaultValue={1}
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>
      <div>
        <Button variant="contained">Valider</Button>
      </div>
    </form>
  );
}