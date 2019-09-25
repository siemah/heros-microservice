import { Router, } from 'express';
import { postLogin } from '../../shared/services/auth';
import endpoints from '../config/endpoints'

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
            res.cookie('_auth', _res.user.token);
          res.status(_res.status).json(_res);
        })
        .catch(error => {
          res.status(400).json({message: 'Something went wrong, try again'});
        })
    }
  }
);

export default authRouter;