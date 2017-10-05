/**
*
* Question
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field } from 'redux-form/immutable';
import { QuestionPropType } from '../../lib/PropTypesValues';
import CustomRadioInput from '../CustomRadioInput';

const Input = styled.input`
  padding: 0.5em;
  margin: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
`;

const requiredValidation = (value) => value ? undefined : 'Question is required. Please choose one option';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
(<div>
  <label htmlFor>
    {label}
  </label>
  <div>
    <Input {...input} type={type} placeholder={label} />
    {touched &&
      error &&
      <span>
        {error}
      </span>}
  </div>
</div>);

const Question = (props) => {
  const { data: question, style } = props;
  if (question.type === 'radio') {
    return (
      <Field
        name={question.name}
        component={CustomRadioInput}
        heading={question.label}
        options={question.options}
        validate={[
          requiredValidation,
        ]}
        style={style}
      />
    );
  }

  return (<Field
    name={question.name}
    type={question.type}
    component={renderField}
    label={question.label}
  />);
};

renderField.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
};

Question.propTypes = {
  data: QuestionPropType,
  style: PropTypes.object,
};

export default Question;
