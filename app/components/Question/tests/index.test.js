import React from 'react';
import { shallow } from 'enzyme';

import Question from '../index';

describe('<Question />', () => {
  it('Renders Question content when passing all props', () => {
    const data = {
      name: 'Question Name',
      label: 'Question Label',
      input: {
      },
      type: 'radio',
      options: [{ label: 'Option 1', value: 1 }, { label: 'Option 2', value: 2 }],
    };
    const wrapper = shallow(
      <Question
        data={data}
      />,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
