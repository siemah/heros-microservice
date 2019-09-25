import React, { useState, } from 'react';
import SEO from '../widgets/SEO';

const Login = ({ postLogin, }) => {
  
  const [credentials, setCredentials] = useState({
    email: null,
    password: null,
  });
  const [loginstate, setLoginstate] = useState({
    loading: false,
    message: null,
  });
  /**
   * change the state depend on html form element
   * @param {HTMLElement} target represent html form node element
   */
  const _onchange = ({ target }) => setCredentials({
    ...credentials,
    [target.name]: target.value,
  });
  /**
   * handle submiting login form
   * @param {GlobalEventHandlers} evn event of submiting form
   */
  const _onsubmit = evn => {
    evn.preventDefault();
    setLoginstate({ loading: true });
    postLogin(evn.target.action, credentials)
      .then(res => {
        if( res.message )
          setLoginstate({ loading: false, message: res.message})
        else if ( res.user ) {
          setLoginstate({ loading: false, message: null, });
          // update global state if its context or ..
        } 
        else 
          setLoginstate({ loading: false, message: 'Something went wrong, try again', });
      })
      .catch(e => {
        console.log('error', e)
        setLoginstate({ loading: false, message: 'Something went wrong, try again' })
      });
  }

  return (
    <form action='/auth/login' method='post' onSubmit={_onsubmit}>
      <SEO title='Login To Booksapp Account' />
      <h1>Login</h1>
      { loginstate.message && <mark>{loginstate.message}</mark>}
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
      <button type='submit'>Let me in</button>
    </form>
  )
}

export default Login
