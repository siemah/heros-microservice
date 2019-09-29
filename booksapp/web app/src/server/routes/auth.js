import { Router, } from 'express';
import { postLogin } from '../../shared/services/auth';
import endpoints from '../config/endpoints'
import cookiesConfig from '../config/cookies';
import User from '../controllers/User';

let authRouter = Router();

authRouter.post(
  '/auth/register',
  async (req, res) => {
    let { email = null, password = null, fname = null, lname = null } = req.body;
    if (!email || !password || !fname || !lname)
      return res.status(401).json({ message: 'All fields are required' });
    else {
      try {
        let user = new User(fname, lname, email, password);
        let _response = await user.create();
        if(_response.status === 'OK') 
          res.cookie('_auth', _response.user.token, cookiesConfig.options);
        res.status(_response.status === 'OK'? 201 : 401).json(_response);
      } catch (error) {
        res.status(401).json({ status:'NO',message: 'Something went wrong try after a moment' });
      }
    }
  }
);

authRouter.post(
  '/auth/login',
  (req, res) => {
    let { email = null, password = null } = req.body;
    if (!email || !password)
      return res.status(401).json({ message: 'Pair email/password must not be empty' });
    else {
      postLogin(endpoints.login, { email, password })
        .then(_res => {
          if(_res.status === 200) 
            res.cookie('_auth', _res.user.token, cookiesConfig.options);
          res.status(_res.status).json(_res);
        })
        .catch(error => {
          res.status(400).json({message: 'Something went wrong, try again'});
        })
    }
  }
);

authRouter.get(
  '/auth/logout',
  (req, res) => {
    res.cookie('_auth', null,  cookiesConfig.expiredOptions);
    res.redirect('/login');
  }
)

export default authRouter;