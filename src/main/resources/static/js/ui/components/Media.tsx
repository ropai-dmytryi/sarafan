import * as React from 'react';
import { IMessage } from 'model/Message';
import { Card, CardMedia, CardContent, Grid } from '@material-ui/core';
import YouTube from './YouTube';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const Media = ({ message }: any) => {
  const result = getMessageType(message);
  return <Card>{ result }</Card>;
};

const getMessageType = (message: IMessage) => {
  if (message.link.indexOf('youtu') > -1) {
    return (<YouTube link={ message.link } />);
  } else if (message.link.match(/\.(jpeg|jpg|gif|png)$/) !== null) {
    return getImageComponent(message);
  } else {
    return getHrefComponent(message);
  }
};

const getHrefComponent = (message: IMessage) => {
  const classes = useStyles({});
  const image = message.linkCover ? (
    <CardMedia component="img" className={ classes.card } src={ message.linkCover } />
  ) : null;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
    >
      { image }
      <CardContent>
        <div>
          <h3>
            <a href={ message.link }>{ message.linkTitle || message.link }</a>
          </h3>
          <div>{ message.linkDescription ? message.linkDescription : '' }</div>
        </div>
      </CardContent>
    </Grid>
  );
};

const getImageComponent = (message: IMessage) => {
  const classes = useStyles({});
  const image = message.linkCover ? (
    <CardMedia component="img" className={ classes.media } src={ message.linkCover } />
  ) : null;
  return (
    <Grid
    container
    direction="column"
    justify="center"
    alignItems="center"
  >
    <a href={ message.link }>
      { image }
    </a>
    </Grid>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      maxWidth: 350,
    },
    media: {
      maxWidth: 500,
    },
  }),
);

export default Media;
