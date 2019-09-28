import { Router, } from 'express';
import { postLogin } from '../../shared/services/auth';
import endpoints from '../config/endpoints'
import cookiesConfig from '../config/cookies';

let authRouter = Router();

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