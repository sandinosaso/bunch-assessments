import React from 'react';
import { shallow } from 'enzyme';

import CustomRadioInput from '../index';

describe('<CustomRadioInput />', () => {
  it('Expect match snapshot', () => {
    const props = {
      input: {},
      options: [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }],
    };

    const wrapper = shallow(
      <CustomRadioInput
        input={props.input}
        options={props.options}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
