// MyForm.test.js
import React from 'react';
import MyForm, { MyFormInner } from './MyForm'
import { shallow } from 'enzyme';

describe('MyForm', () => {
  test('should update an input when it is changed', () => {
    // await new Promise(resolve => setTimeout(resolve));

    const tree = shallow(<MyForm />);
    tree.find(MyFormInner).dive().find('input').simulate('change', {
      // you must add this next line as (Formik calls e.persist() internally)
      persist: () => {},
      // simulate changing e.target.name and e.target.value
      target: {
        name: 'name',
        value: 'ian',
      },
    });

    const newValue = tree.find(MyFormInner).dive().find('input').props().value;

    expect(newValue).toEqual('ian');
  });
});
