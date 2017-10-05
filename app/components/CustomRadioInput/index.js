/**
*
* CustomRadioInput
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Radio } from 'antd';

const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const CustomRadioInput = ({ input, disabled, options, meta: { touched, error } }) => {
  const { name } = input;
  const radioStyle = {
    fontSize: '16px',
    display: 'block',
    height: '40px',
    lineHeight: '40px',
  };

  return (
    <FormItem
      label=""
      validateStatus={touched && error ? 'error' : ''}
      help={touched && error ? error : ''}
    >
      <RadioGroup onChange={input.onChange} value={input.value} name={name}>
        { options.map((option) => (
          <Radio
            key={`${name}-${option.value}`}
            style={radioStyle}
            value={option.value}
            disabled={disabled}
            checked={input.value === option.value}
            id={`${name}-${option.value}`}
            defaultValue={input.value}
          >
            {option.label}
          </Radio>
        ))
      }
      </RadioGroup>
    </FormItem>
  );
};

CustomRadioInput.propTypes = {
  input: PropTypes.object.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  })).isRequired,
  meta: PropTypes.object,
  disabled: PropTypes.bool,
};

export default CustomRadioInput;
