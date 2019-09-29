import React, { useState, useContext, } from 'react';
import SEO from '../widgets/SEO';
import AuthContext from '../context/auth';

const Register = ({ createAccount, }) => {
  const _auth = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    fname: null,
    lname: null,
    email: null,
    password: null,
  });
  const [registerstate, setRegisterstate] = useState({
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
    setRegisterstate({ loading: true });
    createAccount(evn.target.action, credentials)
      .then(res => {
        if( res.status === 'OK' ) {
          setRegisterstate({ loading: false, message: null, });
          // update global state (context or store) then redirect user
          _auth.setAuth({ email: res.user.email, fullname: res.user.fullname, token: res.user.token });
        } 
        else 
          setRegisterstate({ loading: false, message: res.message})
      })
      .catch(e => {
        setRegisterstate({ loading: false, message: 'Something went wrong, try again' })
      });
  }

  return (
    <form action='/auth/register' method='post' onSubmit={_onsubmit}>
      <SEO title='Register For New Booksapp Account' />
      <h1>Create A New Account</h1>
      { registerstate.message && <mark>{registerstate.message}</mark>}
      <div>
        <label>
          First name
        </label><br />
          <input name='fname' onChange={_onchange} />
      </div>
      <div>
      <label>
        Last name
      </label><br />
        <input name='lname' onChange={_onchange} />
    </div>
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
      <button disabled={registerstate.loading} type='submit'>
        {registerstate.loading? 'Lading ..' : 'Let me in'}
      </button>
    </form>
  )
}

export default Register;
