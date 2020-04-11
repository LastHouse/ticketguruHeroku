import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import ReadrQr from '../components/ReadQr';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: 'center',
    alignContent: 'strech'
  }
}));

export default function TicketReader() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h1" component="h2" gutterBottom>
        Lue lippusi
      </Typography>
      <ReadrQr />
      <Divider />
    </div>
  );
}
