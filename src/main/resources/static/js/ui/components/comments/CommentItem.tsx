import * as React from 'react';
import { IComment } from 'model/IComment';
import { Grid, Avatar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface ICommentItemProps {
    comment: IComment;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        small: {
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
    }),
);

const CommentItem = ({ comment }: ICommentItemProps) => {
    const classes = useStyles({});
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            spacing={ 1 }
        >
            <Grid item>
                <Avatar alt="Remy Sharp" src={ comment.author.userpic } className={ classes.small }/>
            </Grid>
            <Grid item>
                <Typography>
                    { comment.text }
                </Typography>
            </Grid>
        </Grid>
    );
};

export default CommentItem;
