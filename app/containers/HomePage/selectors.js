import { createSelector } from 'reselect';

/**
 * Direct selector to the homePage state domain
 */
const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */

const makeSelectAssessmentQuestions = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('questions').toJS()
);

const makeSelectAssessmentResults = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('results').toJS()
);

const makeSelectLoading = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('loading')
);

/**
 * Default selector used by HomePage
 */

const makeSelectHomePage = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.toJS()
);


export {
  makeSelectHomePage,
  makeSelectAssessmentQuestions,
  makeSelectAssessmentResults,
  makeSelectLoading,
  selectHomePageDomain,
};
