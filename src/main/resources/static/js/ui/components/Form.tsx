import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

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

export default reduxForm({
    form: 'mainForm',
    enableReinitialize : true, // this is important option for refresh form (for initial values)
})(Form);
