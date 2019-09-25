import React, { useState, } from 'react';
import SEO from '../widgets/SEO';

const Login = () => {
  
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  /**
   * change the state depend on html form element
   * @param {HTMLElement} target represent html form node element
   */
  const _onchange = ({ target }) => setCredentials({
    ...credentials,
    [target.name]: target.value,
  });

  return (
    <form action='#' method='post'>
      <SEO title='Login To Booksapp Account' />
      <div>
        <label>
          Email
        </label><br />
          <input name='email' onChange={_onchange} />
      </div>
      <div>
        <label>
          Password
        </label><br />
          <input name='password' type='password' onChange={_onchange} />
      </div>
    </form>
  )
}

export default Login
