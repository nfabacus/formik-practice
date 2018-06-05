import React, { Component } from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'

const App = ({  //props is passed here from mapPropsToValue
  values,
  handleChange,
  handleSubmit
})=>(
  <form onSubmit={handleSubmit}>
    <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange}/>
    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange}/>
    <button>Submit</button>
  </form>
)

const FormikApp = withFormik({
  mapPropsToValues({ email, password }) { //you can pass props from parent component
    return {
      email: email || '',
      password: password || ''
    }
  }
})(App)

const ParentApp = (props)=>{
  return (
    <FormikApp email="test@test.com" />
  )
}

export default ParentApp
