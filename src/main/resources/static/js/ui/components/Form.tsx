import * as React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { Dispatch } from 'redux';

const Form = (props: any) => {
    const { handleSubmit, initialValues } = props;
    const action = initialValues.text ? 'Update' : 'Add';
    return (
        <form onSubmit={ handleSubmit }>
            <Field name="text" component="input" type="text"/>
            <button type="submit">{ action }</button>
        </form>
    );
};

const clearForm = (result: any, dispatch: Dispatch) => dispatch(reset('mainForm'));

export default reduxForm({
    form: 'mainForm',
    onSubmitSuccess: clearForm,
    enableReinitialize: true, // this is important option for refresh form (for initial values)
})(Form);
