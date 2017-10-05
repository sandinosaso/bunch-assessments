/*
 *
 * HomePage actions
 *
 */

import {
  DEFAULT_ACTION, SAVE_ASSESSMENT, SAVE_ASSESSMENT_SUCCESS, SAVE_ASSESSMENT_ERROR,
  GET_ASSESSMENT_QUESTIONS, GET_ASSESSMENT_QUESTIONS_SUCCESS, GET_ASSESSMENT_QUESTIONS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveAssessment(answers) {
  return {
    type: SAVE_ASSESSMENT,
    payload: {
      answers,
    },
  };
}

export function saveAssessmentSuccess(answers) {
  return {
    type: SAVE_ASSESSMENT_SUCCESS,
    payload: {
      answers,
    },
  };
}

export function saveAssessmentError(error) {
  return {
    type: SAVE_ASSESSMENT_ERROR,
    payload: {
      error,
    },
  };
}

export function getAssessmentQuestions() {
  return {
    type: GET_ASSESSMENT_QUESTIONS,
  };
}

export function getAssessmentQuestionsSuccess(questions) {
  return {
    type: GET_ASSESSMENT_QUESTIONS_SUCCESS,
    payload: {
      questions,
    },
  };
}

export function getAssessmentQuestionsError(error) {
  return {
    type: GET_ASSESSMENT_QUESTIONS_ERROR,
    payload: {
      error,
    },
  };
}

