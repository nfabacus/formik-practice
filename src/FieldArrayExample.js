import React from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import { Label } from 'reactstrap'
import * as Yup from "yup";

const schema = Yup.object().shape({
  friends: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string()
          .min(4, 'too short')
          .required('Required'), // these constraints take precedence
      })
    )
    .required('Must have friends') // these constraints are shown if and only if inner constraints are satisfied
    .min(3, 'Minimum of 3 friends'),
});

const customError = (props) => {
  console.log("props>>>>", props);
  return <span style={{ color: "red" }}>{props.children}</span>
};

const SectionError = ({errors}) => {
  if (typeof errors.friends === 'string') {
    return <div>{errors.friends}</div>
  } else { return null }
}


export default () => (
  <div>
    <h1>Dynamic List - FieldArray with Validations Example</h1>
    <Formik
      validationSchema={schema}
      initialValues={{ friends: [ {type: 'Builder',  value: 'Bob'}, {type: 'Coder', value: 'Steve'}, { type: 'Friend', value: 'Jim'}] }}
      onSubmit={values =>
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
        }, 500)
      }
      render={(props) => {
        console.log('render::props>>>', props)

        const { values, errors } = props
        return (
          <Form>
            <FieldArray
              name="friends"
              render={arrayHelpers => (
                <div>
                  {values.friends && values.friends.length > 0 ? (
                    values.friends.map((friend, index) => (
                      <div key={index}>
                        <Label>
                          {friend.type} &nbsp;
                          <Field name={`friends.${index}.value`} />
                          <ErrorMessage name={`friends.${index}.value`} component={customError}/>
                        </Label>

                        <button
                          type="button"
                          onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                        >
                          -
                        </button>
                        <button
                          type="button"
                          onClick={() => arrayHelpers.insert(index, {type: 'Friend',  value: ''})} // insert an empty string at a position
                        >
                          +
                        </button>
                      </div>
                    ))
                  ) : (
                    <button type="button" onClick={() => arrayHelpers.push({type: 'Friend',  value: ''})}>
                      {/* show this when user has removed all friends from the list */}
                      Add a friend
                    </button>
                  )}
                 <SectionError errors={errors}/>
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
              )}
            />
          </Form>
        )
      }}
    />
  </div>
);