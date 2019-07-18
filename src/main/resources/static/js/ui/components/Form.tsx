import * as React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Dispatch } from 'redux';
import { TextField, Button, Grid } from '@material-ui/core';

const Form = (props: any) => {
    const { handleSubmit, initialValues } = props;
    const action = initialValues.text ? 'Update' : 'Add';
    return (
        <form onSubmit={ handleSubmit }>
            <Grid container spacing={ 2 }>
                <Grid item xs={ 10 }>
                    <Field
                        name="text"
                        component={ renderField }
                    />
                </Grid>
                <Grid item xs={ 2 }>
                    <Button type="submit" variant="contained">
                        { action }
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
      label="New message"
      placeholder="Write something"
      fullWidth
      { ...input }
      { ...custom }
      InputLabelProps={ {
          shrink: true,
        } }
    />
  );

const clearForm = (result: any, dispatch: Dispatch) => dispatch(reset('mainForm'));

export default reduxForm({
    form: 'mainForm',
    onSubmitSuccess: clearForm,
    enableReinitialize: true, // this is important option for refresh form (for initial values)
})(Form);
