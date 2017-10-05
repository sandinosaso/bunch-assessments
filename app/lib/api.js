/*
 *  wrapper for api calls
 */

import request from './request';

export default function Assessments() {
  const baseURL = '/api';
  return {
    getResults: () => request(`${baseURL}/results`, { mode: 'cors' }),
    get: () => request(`${baseURL}/questions`),
    save: (data) => {
      const jsonBody = JSON.stringify(data);
      return request(`${baseURL}/assessments`,
        { method: 'post',
          body: jsonBody,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    },
  };
}
