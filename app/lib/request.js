import 'whatwg-fetch';
const apiUrl = 'http://localhost:3001';
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.ok) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function serialize(obj) {
  const str = [];

  Object.keys(obj).forEach((p) => {
    if (Object.prototype.hasOwnProperty.call(obj, p)) {
      str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
    }
  });

  return str.join('&');
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options = {}) {
  const newOptions = { ...options };
  let params = '';

  if (!newOptions.headers) {
    newOptions.headers = {};
  }

  if (newOptions.params) {
    params = serialize(newOptions.params);
    if (params.length) {
      params = `?${params}`;
    }
    delete newOptions.params;
  }

  return fetch(`${apiUrl}${url}${params}`, newOptions)
    .then(checkStatus)
    .then(parseJSON);
}
