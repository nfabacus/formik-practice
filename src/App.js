import React from 'react'
import FirstForm from './FirstForm'
import ErrorMessageExample from './ErrorMessageExample'
import FieldArrayExample from './FieldArrayExample';
const App = (props)=>{
  return (
    <div>
      {/*<FormikApp email="test@test.com" />*/}
      <FirstForm />
      <ErrorMessageExample />
      <FieldArrayExample />
    </div>
  )
};

export default App
