import { takeLatest, call, put } from 'redux-saga/effects';

import { SAVE_ASSESSMENT, GET_ASSESSMENT_QUESTIONS } from './constants';
import Assessments from '../../lib/api';
import { saveAssessmentSuccess, saveAssessmentError, getAssessmentQuestionsSuccess, getAssessmentQuestionsError } from './actions';

const getAssessmentQuestions = function* getAssessmentQuestions() {
  try {
    const questions = yield call(Assessments().get);
    yield put(getAssessmentQuestionsSuccess(questions));
    return questions;
  } catch (err) {
    yield put(getAssessmentQuestionsError(err));
    throw err;
  }
};

const saveAssessment = function* saveAssessment(action) {
  try {
    const { answers } = action.payload;
    const saveResult = yield call(Assessments().get, answers);
    yield put(saveAssessmentSuccess(answers));
    return saveResult;
  } catch (err) {
    yield put(saveAssessmentError(err));
    throw err;
  }
};

const mySaga = function* mySaga() {
  yield [
    takeLatest(SAVE_ASSESSMENT, saveAssessment),
    takeLatest(GET_ASSESSMENT_QUESTIONS, getAssessmentQuestions),
  ];
};

export default mySaga;

