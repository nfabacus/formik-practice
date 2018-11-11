import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
});

export default () => (
  <div>
    <h1>Form with Error Messages Examples</h1>
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="name"  />
            <ErrorMessage name="name" />
          <Field name="email" type="email" />
            <ErrorMessage name="email" component={customError}/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

const customError = (props) => {
   return <span style={{ color: "red" }}>{props.children}</span>
};