/**
*
* Assessment
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FieldArray, reduxForm, getFormSyncErrors, getFormValues } from 'redux-form/immutable';
import { Col, Row, Form, Button } from 'antd';

import messages from './messages';
import { QuestionPropType } from '../../lib/PropTypesValues';
import Question from '../Question';

const FormContainer = styled.div`
  padding: 2.5em;
  min-width: 500px;
  margin: 0.5em;
  display: inline-block;
  border: 1px solid #ED27CB;
  border-radius: 3px;
`;

const renderQuestions = ({ questions }) =>
(<ul>
  {questions.map((question) =>
    (<li key={question.id}>
      <Question data={question} />
    </li>)
  )}
</ul>);

const Assessment = (props) => {
  const { handleSubmit, onSubmit, questions, submitting, error } = props;
  return (
    <FormContainer style={{}}>
      <Row gutter={20}>
        <span>
          <h3><FormattedMessage {...messages.header} /></h3>
        </span>
        <Form layout="vertical" onSubmit={handleSubmit(onSubmit)}>
          <Row >
            <Col span={32}>
              <FieldArray
                name="questions"
                component={renderQuestions}
                questions={questions}
              />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col>
              <Button htmlType="submit" type="primary" disabled={submitting || error}>
                <FormattedMessage {...messages.submit} />
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </FormContainer>
  );
};

renderQuestions.propTypes = {
  questions: PropTypes.arrayOf(
    QuestionPropType,
  ),
};

Assessment.propTypes = {
  handleSubmit: PropTypes.func,
  onSubmit: PropTypes.func,
  error: PropTypes.object,
  questions: PropTypes.array,
  submitting: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => {
  const formInitialValues = ownProps.initialValues;
  return ({
    initialValues: formInitialValues,
    formSyncErrors: (() => {
      const syncErrors = getFormSyncErrors('assessment-form')(state);
      if (syncErrors && syncErrors.fields) {
        return syncErrors.fields;
      }
      return [];
    })(),
    actualValues: getFormValues('assessment-form')(state),
  });
};

const mapDispatchToProps = (dispatch) => ({ dispatch });

const AssessmentReduxFormWrapper = reduxForm({
  form: 'assessment-form', // a unique identifier for this form
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(Assessment);

export default connect(mapStateToProps, mapDispatchToProps)(AssessmentReduxFormWrapper);
