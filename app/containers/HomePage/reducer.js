/*
 *
 * HomePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  SAVE_ASSESSMENT_SUCCESS,
  GET_ASSESSMENT_QUESTIONS,
  GET_ASSESSMENT_QUESTIONS_SUCCESS,
  GET_ASSESSMENT_QUESTIONS_ERROR,
} from './constants';
import { calculateAssessmentMetrics } from '../../lib/util';

const initialState = fromJS({
  results: {},
  questions: [],
  loading: false,
  error: {},
});

function HomePageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case SAVE_ASSESSMENT_SUCCESS:
      return state
              .set('loading', false)
              .set('results', fromJS(calculateAssessmentMetrics(action.payload.answers)));
    case GET_ASSESSMENT_QUESTIONS:
      return state.set('loading', true);
    case GET_ASSESSMENT_QUESTIONS_SUCCESS:
      return state
              .set('loading', false)
              .set('questions', fromJS(action.payload.questions));
    case GET_ASSESSMENT_QUESTIONS_ERROR:
      return state
              .set('loading', false)
              .set('error', action.payload);
    default:
      return state;
  }
}

export default HomePageReducer;
