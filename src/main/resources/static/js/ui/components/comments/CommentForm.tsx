import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextField, Button, Grid } from '@material-ui/core';

interface ICommentFormProps {
    handleSubmit: (value: any) => (commentText: string, messageId: number, formNameForReset: string) => void;
}

const CommentForm = ({ handleSubmit }: ICommentFormProps) => {
    return (
        <form onSubmit={ handleSubmit }>
            <Grid
                container
                direction="row"
                justify="flex-end"
                alignItems="flex-start"
            >
                <Grid item xs={ 11 }>
                    <Field name="text" component={ renderField }/>
                </Grid>
                <Grid item xs={ 1 }>
                    <Button type="submit" variant="contained">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

const renderField = ({
                         input,
                         ...custom
                     }: any) => (
    <TextField
        label="Add comment"
        placeholder="Write something"
        fullWidth
        { ...input }
        { ...custom }
        InputLabelProps={ {
            shrink: true,
        } }
    />
);

export default reduxForm({})(CommentForm);
