import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import 'moment-timezone';
import Divider from '@material-ui/core/Divider';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    width: 200,
    height: 300,
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function EventCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <NewReleasesIcon />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.name}
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            <Moment format="DD/MM/YYYY  HH:mm">{props.date}</Moment>
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            {props.info}
          </Typography>
          <Divider />
          <Typography variant="body2" color="textSecondary" component="p">
            Ticket Capacity: {props.ticketCapacity}
          </Typography>
          <Divider />
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button>Buy</Button>
      </CardActions>
    </Card>
  );
}
