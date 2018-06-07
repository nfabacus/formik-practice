import React from 'react'
import { Button, FormGroup, Label } from 'reactstrap';
import { withFormik, Form, Field } from 'formik'
import * as yup from 'yup'

const App = ({  //props is passed here from mapPropsToValue
  values,
  errors,
  touched,  //check if the input is already visited
  isSubmitting
  // handleChange,
  // handleSubmit
})=>(
  // //version 1
  // <form onSubmit={handleSubmit}>
  //   <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
  //   <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
  //   <button>Submit</button>
  // </form>

  // //Version 2
  // <Form className="m-4">
  //   <FormGroup>
  //     <Label for="email">Email</Label>
  //     <Field id="email" className={`form-control ${touched.email && errors.email?"border-danger":""}`} type="email" name="email" placeholder="Please type in your email here." />
  //     { touched.email && errors.email && <div style={{color:"red"}}>{errors.email}</div> }
  //   </FormGroup>
    
  //   <FormGroup>
  //     <Label for="password">Password</Label>
  //     <Field id="password" className={`form-control ${touched.password && errors.password?"border-danger":""}`}  type="password" name="password" placeholder="Please type in your email here." />
  //     { touched.password && errors.password && <div style={{color:"red"}}>{errors.password}</div> }
  //   </FormGroup>

  //   <Label>
  //     <Field type="checkbox" name="newsletter" checked={values.newsletter} /> {' '}
  //     Join our newsletter
  //   </Label>
  //   <Field className="form-control" component="select" name="plan">
  //     <option value="free">Free</option>
  //     <option value="premium">Premium</option>
  //   </Field>
  //   <div className="mt-4">
  //     <Button color="primary" disabled={isSubmitting}>Submit</Button>
  //   </div>
  // </Form>

  // //Version 3
  <Form className="m-4">
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
      <Button color="primary" disabled={isSubmitting}>Submit</Button>
    </div>
  </Form>

)

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
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) { //you can pass props from parent component
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || true,
      plan: plan || 'free'
    }
  },
  validationSchema: yup.object().shape({
    email: yup.string().email('email not valid').required('email is required'),
    password: yup.string().min(9, 'Password must be 9 characters or longer').required('Password is required')
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(()=>{
      if(values.email=== 'test@test.io') {
        setErrors({ email: 'That email is already taken.'})
      } else {
        console.log(values)
        resetForm()
      }
      setSubmitting(false) //setSubmitting prop to false
    }, 2000)
  }
})(App)

const ParentApp = (props)=>{
  return (
    // <FormikApp email="test@test.com" />
    <FormikApp />
  )
}

export default ParentApp
