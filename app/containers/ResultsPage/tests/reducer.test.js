
import { fromJS } from 'immutable';
import resultsPageReducer from '../reducer';
import { FETCH_ASSESSMENTS_RESULTS, FETCH_ASSESSMENTS_RESULTS_SUCCESS } from '../constants';

describe('resultsPageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      results: {},
      profile: {},
      loading: false,
      error: {},
    };
    expect(resultsPageReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle FETCH_ASSESSMENTS_RESULTS', () => {
    const initialState = resultsPageReducer(undefined, {});
    expect(
      resultsPageReducer(initialState, {
        type: FETCH_ASSESSMENTS_RESULTS,
        payload: {},
      })
    ).toEqual(fromJS(
      {
        results: {},
        profile: {},
        loading: true,
        error: {},
      },
    ));
  });

  it('should handle FETCH_ASSESSMENTS_RESULTS_SUCCESS', () => {
    const initialState = resultsPageReducer(undefined, {});
    expect(
      resultsPageReducer(initialState, {
        type: FETCH_ASSESSMENTS_RESULTS_SUCCESS,
        payload: {
          results: {
            individual: {
              dimensions: {
                Adaptive: 8,
                Integrity: 5,
                Collaborative: 6,
                Result: 2,
                Customer: 5,
                Detail: 4,
              },
              user: {
                unique_id: '107083774298897846697',
              },
            },
            profile: {
              dimensionTags: {
                positive: [
                  'Not afraid to experiment and take risks',
                  'Comfortable in dynamic environments',
                  'Easy-going',
                  'Calm',
                ],
                negative: [
                  'May not emphasize caution',
                  'May seem reckless',
                  'Has difficulty finishing projects',
                  'May perform poorly in high-pressure situations',
                ],
              },
              header: 'readily takes advantage of new opportunities and is a great team player',
              subHeader: '{fname} is highly adaptable, able to adjust to uncertain and dynamic situations.   On the other hand they scored low on results-orientation, and may have problems in high-pressure environments.',
            },
          },
        },
      })
    ).toEqual(fromJS(
      {
        results: {
          Adaptive: 8,
          Integrity: 5,
          Collaborative: 6,
          Result: 2,
          Customer: 5,
          Detail: 4,
        },
        profile: {
          dimensionTags: {
            positive: [
              'Not afraid to experiment and take risks',
              'Comfortable in dynamic environments',
              'Easy-going',
              'Calm',
            ],
            negative: [
              'May not emphasize caution',
              'May seem reckless',
              'Has difficulty finishing projects',
              'May perform poorly in high-pressure situations',
            ],
          },
          header: 'readily takes advantage of new opportunities and is a great team player',
          subHeader: '{fname} is highly adaptable, able to adjust to uncertain and dynamic situations.   On the other hand they scored low on results-orientation, and may have problems in high-pressure environments.',
        },
        loading: false,
        error: {},
      },
    ));
  });
});
