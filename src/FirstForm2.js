import React from 'react'
import { Button, FormGroup, Label } from 'reactstrap';
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'

export const InnerForm = ({  //props is passed here from mapPropsToValue
                     values,
                     errors,
                     touched,  //check if the input is already visited
                     isSubmitting
                     // handleChange,
                     // handleSubmit
                   })=>(
  <Form className="m-4">
    <h1>Formik Forms Example with Validations - Test</h1>
    <FormGroup>
      <Label for="email">Email</Label>
      <Field id="email" name="email" type="email" placeholder="Please type in your Email here." component={CustomInputComponent} />
    </FormGroup>

    <FormGroup>
      <Label for="password">Password</Label>
      <Field id="password" name="password" type="password" placeholder="Please type in your password here." component={CustomInputComponent} />
    </FormGroup>

    <Label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} /> {' '}
      Join our newsletter
    </Label>
    <Field className="form-control" component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <div className="mt-4">
      <Button id="submitBtn" type="submit" color="primary" disabled={isSubmitting}>{isSubmitting?'Submitting':'Submit'}</Button>
    </div>
  </Form>
);

const CustomInputComponent = ({
                                field, // { name, value, onChange, onBlur }
                                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                ...props
                              }) => {
  return (
    <div>
      <input className={`form-control ${touched[field.name] && errors[field.name]?"border-danger":""}`}  {...field} {...props} />
      { touched[field.name] && errors[field.name] && <div className="text-danger">{errors[field.name]}</div> }
    </div>
  )
};

export const mapPropsToValues = ({ email, password, newsletter, plan }) => { //you can pass props from parent component
  return {
    email: email || '',
    password: password || '',
    newsletter: newsletter || true,
    plan: plan || 'free'
  }
};

export const validationSchema = yup.object().shape({
  email: yup.string().email('email not valid').required('email is required'),
  password: yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
});

export const handleSubmit = (values, { resetForm, setErrors, setSubmitting }) => {
  setTimeout(()=>{
    if(values.email=== 'test@test.io') {
      setErrors({ email: 'That email is already taken.'})
    } else {
      console.log(values);
      resetForm()
    }
    setSubmitting(false) //setSubmitting prop to false
  }, 2000)
};

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit,
})(InnerForm);

