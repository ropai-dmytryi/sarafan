import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Card,
  Button,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Media from './Media';

const Message = (props: any) => {
  const classes = useStyles({});
  const { message, deleteMessage, setUpdatedMessage } = props;
  const link = message.link ? (<Media message={ message }/>) : null;
  return (
    <Card className={ classes.card } raised={ false }>
      <CardContent>
        <Typography variant="h5" component="h2">
          { message.text }
        </Typography>
      </CardContent>
      { link }
      <CardActions>
        <Button onClick={ () => setUpdatedMessage(message) }>Update</Button>
        <IconButton onClick={ () => deleteMessage(message.id) }>
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      marginTop: 4,
      marginBottom: 4,
      width: 1280,
    },
  }),
);

export default Message;
