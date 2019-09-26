import fetch from 'isomorphic-fetch'

/**
 * send a request for login
 * @param {string} endpoint link to endpoint
 * @param {object} credentials contains auth credentials
 * @return Promise<object|null> 
 */
export const postLogin = (endpoint, credentials, headers={}) => {
  const encodedURI = encodeURI(endpoint)

  return fetch(encodedURI, {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    }
  })
    .then((data) => data.json())
    .then(res => res)
    .catch((error) => {
      console.warn(error)
      return null
    });
}