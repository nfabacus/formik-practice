import React from 'react'
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
  // <form onSubmit={handleSubmit}>
  //   <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
  //   <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
  //   <button>Submit</button>
  // </form>
  <Form>
    <div>
      { touched.email && errors.email && <p>{errors.email}</p> }
      <Field type="email" name="email" placeholder="Email" />
    </div>
    
    <div>
      { touched.password && errors.password && <p>{errors.password}</p> }
      <Field type="password" name="password" placeholder="Password" />
    </div>
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our newsletter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button disabled={isSubmitting}>Submit</button>
  </Form>
)

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
