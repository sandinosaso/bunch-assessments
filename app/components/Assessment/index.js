/**
*
* Assessment
*
*/

import React from 'react';
// import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray, reduxForm } from 'redux-form/immutable';
import messages from './messages';

const renderField = ({ input, label, type, meta: { touched, error } }) =>
  (<div>
    <label>
      {label}
    </label>
    <div>
      <input {...input} type={type} placeholder={label} />
      {touched &&
        error &&
        <span>
          {error}
        </span>}
    </div>
  </div>);

const renderQuestions = ({ questions, meta: { error, submitFailed } }) =>
(<ul>
  {questions.map((question, index) =>
    <li key={index}>
      <Field
        name={`${question.name}`}
        type={`${question.type}`}
        component={renderField}
        label={`${question.label}`}
      />
    </li>
  )}
</ul>);

const Assessment = (props) => {
  const { handleSubmit, questions, pristine, reset, submitting } = props
  return (
    <div>
      <h3><FormattedMessage {...messages.header} /></h3>
      <form onSubmit={handleSubmit}>
        <FieldArray name="questions" component={renderQuestions} questions={questions} />

        <div>
          <label>Sex</label>
          <div>
            <label>
              <Field
                name="sex"
                component="input"
                type="radio"
                value="male"
              />{' '}
              Male
            </label>
            <label>
              <Field
                name="sex"
                component="input"
                type="radio"
                value="female"
              />{' '}
              Female
            </label>
          </div>
        </div>
        <div>
          <button type="submit" disabled={submitting}>
            Submit
          </button>
          <button type="button" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </button>
        </div>
      </form>
    </div>
  );
};

Assessment.propTypes = {

};

export default reduxForm({
  form: 'assessment-form', // a unique identifier for this form
})(Assessment);
