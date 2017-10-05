import { takeLatest, call, put } from 'redux-saga/effects';

import { FETCH_ASSESSMENTS_RESULTS } from './constants';
import Assessments from '../../lib/api';
import { getAssessmentsResultsSuccess, getAssessmentsResultsError } from './actions';

const getAssessmentsResults = function* getAssessmentsResults() {
  try {
    const results = yield call(Assessments().getResults);
    yield put(getAssessmentsResultsSuccess(results));
    return results;
  } catch (err) {
    yield put(getAssessmentsResultsError(err));
    throw err;
  }
};

const mySaga = function* mySaga() {
  yield [
    takeLatest(FETCH_ASSESSMENTS_RESULTS, getAssessmentsResults),
  ];
};

export default mySaga;

