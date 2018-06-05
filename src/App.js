import React from 'react'
import { withFormik, Form, Field } from 'formik'
import Yup from 'yup'

const App = ({  //props is passed here from mapPropsToValue
  values,
  // handleChange,
  // handleSubmit
})=>(
  // <form onSubmit={handleSubmit}>
  //   <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
  //   <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
  //   <button>Submit</button>
  // </form>
  <Form>
    <Field type="email" name="email" placeholder="Email" />
    <Field type="password" name="password" placeholder="Password" />
    <label>
      <Field type="checkbox" name="newsletter" checked={values.newsletter} />
      Join our newsletter
    </label>
    <Field component="select" name="plan">
      <option value="free">Free</option>
      <option value="premium">Premium</option>
    </Field>
    <button>Submit</button>
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
  handleSubmit(values) {
    console.log(values)
  }
})(App)

const ParentApp = (props)=>{
  return (
    <FormikApp email="test@test.com" />
  )
}

export default ParentApp
