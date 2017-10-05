import { createSelector } from 'reselect';

/**
 * Direct selector to the resultsPage state domain
 */
const selectResultsPageDomain = (state) => state.get('resultsPage');
const selectHomePageDomain = (state) => state.get('homePage');

/**
 * Other specific selectors
 */

const makeSelectResults = () => createSelector(
  selectHomePageDomain,
  (substate) => substate.get('results').toJS()
);

const makeSelectProfile = () => createSelector(
  selectResultsPageDomain,
  (substate) => substate.get('profile').toJS()
);

const makeSelectLoading = () => createSelector(
  selectResultsPageDomain,
  (substate) => substate.get('loading')
);

/**
 * Default selector used by ResultsPage
 */

const makeSelectResultsPage = () => createSelector(
  selectResultsPageDomain,
  (substate) => substate.toJS()
);

export {
  makeSelectResultsPage,
  selectResultsPageDomain,
  makeSelectResults,
  makeSelectProfile,
  makeSelectLoading,
};
