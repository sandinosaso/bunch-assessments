import React from 'react';
import { FieldArray } from 'redux-form';
import configureStore from 'redux-mock-store';

import Assessment from '../index';
import Question from '../../Question';
import shallowWithStore from '../../../lib/tests/util';

describe('<Assessment />', () => {
  let props;
  let mountedAssessment;
  const AssessmentComponent = (ownProps) => {
    if (!mountedAssessment) {
      const middlewares = [];
      const mockStore = configureStore(middlewares);
      const initialState = {};
      const store = mockStore(initialState);

      mountedAssessment = shallowWithStore(<Assessment {...props} {...ownProps} />, store);
    }
    return mountedAssessment;
  };

  beforeEach(() => {
    props = {
      handleSubmit: undefined,
      onSubmit: undefined,
      error: undefined,
      questions: undefined,
      submitting: undefined,
    };
    mountedAssessment = undefined;
  });

  it('It renders a `Assessment` on a div', () => {
    expect(AssessmentComponent().find('div').length).toBeGreaterThan(0);
  });

  it('It renders a `Assessment` on a div', () => {
    expect(AssessmentComponent().find('div').length).toBeGreaterThan(0);
  });

  it('renders one <FieldArray /> component', () => {
    const questions = [
      {
        options: [
          {
            text: 'I listen to customers',
            id: 1,
            dimension: 'Customer',
          },
          {
            text: 'I am a good communicator',
            id: 6,
            dimension: 'Collaborative',
          },
        ],
      },
    ];

    expect(AssessmentComponent({ questions }).find(FieldArray).length).to.have.length(1);
    expect(AssessmentComponent({ questions }).find(Question).length).to.have.length(1);
  });
});
