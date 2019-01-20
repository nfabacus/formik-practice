import React from 'react';
import { withFormik, yupToFormError } from 'formik'
import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup
    .string()
    .min(2, 'Must be longer than 2 characters')
    .max(30, 'No one\'s name is that long')
    .required('Required')
})

export const handleSubmit = (values, { setSubmitting }) => {
  setTimeout(() => {
    setSubmitting(false)
  }, 1000)
}

export const mapPropsToValues =  props => ({ name: '' })


export const MyFormInner = ({
                              values,
                              handleSubmit,
                              handleChange,
                              handleBlur,
                              setStatus,
                              status,
                              errors,
                              isSubmitting,
                            }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={handleChange}
        onBlur={handleBlur}
        value={values.name}
        name="name"
      />
      {errors.name &&
      <div id="feedback">
        {errors.name}
      </div>}
      {isSubmitting && <div id="submitting">Submitting</div>}
      {status &&
      !!status.myStatusMessage &&
      <div id="status">
        {status.myStatusMessage}
      </div>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default withFormik({
  mapPropsToValues,
  validationSchema,
  handleSubmit
})(MyFormInner);
