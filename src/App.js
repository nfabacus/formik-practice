import React from 'react'
import FirstForm from './FirstForm'
import FirstForm2 from './FirstForm2'
// import MyForm from './MyForm';
import ErrorMessageExample from './ErrorMessageExample'
import FieldArrayExample from './FieldArrayExample';
const App = (props)=>{
  return (
    <div>
      {/*<FormikApp email="test@test.com" />*/}
      {/*<FirstForm />*/}
      <FirstForm2 />
      {/*<MyForm />*/}
      <ErrorMessageExample />
      <FieldArrayExample />
    </div>
  )
};

export default App
