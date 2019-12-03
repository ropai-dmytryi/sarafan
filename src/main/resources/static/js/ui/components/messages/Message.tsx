import {
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Card,
  Button,
  Avatar,
  Grid,
} from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Media from './media/Media';
import { IMessage } from 'model/IMessage';
import CommentList from 'ui/components/comments/CommentList';

interface IMessageProps {
  message: IMessage;
  deleteMessage: (id: number) => void;
  setUpdatedMessage: (message: IMessage) => void;
  createComment: (commentText: string, messageId: number, formNameForReset: string) => void;
}

const Message = ({ message, deleteMessage, setUpdatedMessage, createComment }: IMessageProps) => {
  const { card } = useStyles({});
  const link = message.link ? (<Media message={ message } />) : null;
  console.log(message);
  return (
    <Card className={ card } raised={ false }>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          spacing={ 2 }
        >
          <Grid item>
            <Avatar alt="Remy Sharp" src={ message.author.userpic } />
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2">
              { message.text }
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      { link }
      <CardActions>
        <Button onClick={ () => setUpdatedMessage(message) }>Update</Button>
        <IconButton onClick={ () => deleteMessage(message.id) }>
          <Delete />
        </IconButton>
      </CardActions>
      <CommentList message={ message } createComment={ createComment } />
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
