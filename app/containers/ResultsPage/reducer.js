/*
 *
 * ResultsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  FETCH_ASSESSMENTS_RESULTS,
  FETCH_ASSESSMENTS_RESULTS_SUCCESS,
  FETCH_ASSESSMENTS_RESULTS_ERROR,
} from './constants';

const initialState = fromJS({
  results: {},
  profile: {},
  loading: false,
  error: {},
});

function resultsPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case FETCH_ASSESSMENTS_RESULTS:
      return state.set('loading', true);
    case FETCH_ASSESSMENTS_RESULTS_SUCCESS:
      return state
              .set('loading', false)
              .set('results', fromJS(action.payload.results.individual.dimensions))
              .set('profile', fromJS(action.payload.results.profile));
    case FETCH_ASSESSMENTS_RESULTS_ERROR:
      return state
            .set('loading', false)
            .set('error', action.payload);
    default:
      return state;
  }
}

export default resultsPageReducer;
