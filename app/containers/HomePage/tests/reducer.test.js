
import { fromJS } from 'immutable';
import homePageReducer from '../reducer';
import { GET_ASSESSMENT_QUESTIONS, GET_ASSESSMENT_QUESTIONS_SUCCESS } from '../constants';

describe('homePageReducer', () => {
  it('returns the initial state', () => {
    const initialState = {
      results: {},
      questions: [],
      loading: false,
      error: {},
    };
    expect(homePageReducer(undefined, {})).toEqual(fromJS(initialState));
  });

  it('should handle GET_ASSESSMENT_QUESTIONS', () => {
    const initialState = homePageReducer(undefined, {});
    expect(
      homePageReducer(initialState, {
        type: GET_ASSESSMENT_QUESTIONS,
        payload: {},
      })
    ).toEqual(fromJS(
      {
        results: {},
        questions: [],
        loading: true,
        error: {},
      },
    ));
  });

  it('should handle GET_ASSESSMENT_QUESTIONS_SUCCESS', () => {
    const initialState = homePageReducer(undefined, {});
    expect(
      homePageReducer(initialState, {
        type: GET_ASSESSMENT_QUESTIONS_SUCCESS,
        payload: {
          questions: [
            {
              options: [
                {
                  text: 'I value our clients',
                  id: 3,
                  dimension: 'Customer',
                },
                {
                  text: 'I am flexible',
                  id: 6,
                  dimension: 'Adaptive',
                },
              ],
            },
            {
              options: [
                {
                  text: 'I am accurate in my work',
                  id: 8,
                  dimension: 'Detail',
                },
                {
                  text: 'I always try to do the right thing',
                  id: 9,
                  dimension: 'Integrity',
                },
              ],
            },
          ],
        },
      })
    ).toEqual(fromJS(
      {
        results: {},
        questions: [
          {
            options: [
              {
                text: 'I value our clients',
                id: 3,
                dimension: 'Customer',
              },
              {
                text: 'I am flexible',
                id: 6,
                dimension: 'Adaptive',
              },
            ],
          },
          {
            options: [
              {
                text: 'I am accurate in my work',
                id: 8,
                dimension: 'Detail',
              },
              {
                text: 'I always try to do the right thing',
                id: 9,
                dimension: 'Integrity',
              },
            ],
          },
        ],
        loading: false,
        error: {},
      },
    ));
  });
});
