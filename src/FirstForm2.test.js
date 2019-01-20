import React from 'react';
import FirstForm2, { InnerForm } from "./FirstForm2";
import { mount } from 'enzyme';

describe('FirstForm2', () => {
  const tree = mount(<FirstForm2 />);
  test('should update an input when it is changed', () => {
    tree.find(InnerForm).find('#email').find('input').simulate('change', {
      // you must add this next line as (Formik calls e.persist() internally)
      persist: () => {},
      // simulate changing e.target.name and e.target.value
      target: {
        name: 'email',
        value: 'tester@test.com',
      },
    });

    const newValue = tree.find(InnerForm).find('#email').find('input').props().value;
    expect(newValue).toEqual('tester@test.com');
  });

  test('submits the form with the values', () => {
    expect(tree.find(InnerForm).find('form').find('Button').text()).toEqual('Submit');
    // expect(tree.find(InnerForm).find('#submitting')).toHaveLength(0);
    tree.find(InnerForm).find('form').simulate('submit', {
      preventDefault: () => {} // no op
    });
    expect(tree.find(InnerForm).find('form').find('Button').text()).toEqual('Submitting');
    expect(tree.find(InnerForm).props().values.email).toEqual('tester@test.com');
  });
});
