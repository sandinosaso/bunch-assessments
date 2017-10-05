/*
 *
 * ResultsPage actions
 *
 */

import {
  DEFAULT_ACTION,
  FETCH_ASSESSMENTS_RESULTS,
  FETCH_ASSESSMENTS_RESULTS_SUCCESS,
  FETCH_ASSESSMENTS_RESULTS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getAssessmentsResults() {
  return {
    type: FETCH_ASSESSMENTS_RESULTS,
    payload: {
    },
  };
}

export function getAssessmentsResultsSuccess(results) {
  return {
    type: FETCH_ASSESSMENTS_RESULTS_SUCCESS,
    payload: {
      results,
    },
  };
}

export function getAssessmentsResultsError(error) {
  return {
    type: FETCH_ASSESSMENTS_RESULTS_ERROR,
    payload: {
      error,
    },
  };
}

