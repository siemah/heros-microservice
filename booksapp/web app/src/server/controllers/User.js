import { postLogin as postRequst } from "../../shared/services/auth";
import endpoints from "../config/endpoints";

class User {

  constructor(fname=null, lname=null, email=null, password=null) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
  }

  create() {
    return new Promise((resolve, reject) => {
      let { email, password, lname, fname, } = this;
      if(!this.email || !this.password) 
        reject(`${!this.email ? 'Email' : 'Password'} field is required`);
      
      postRequst(endpoints.register, { email, password, lname, fname, })
        .then(_res => {
          if (_res.status === 'NO')
            reject(_res);
          else if (_res.status === 'OK') 
            resolve(_res);
        })
        .catch(({ message }) => {
          reject({ message });
        })
    })
  }

  /**
   * retrieve user data from auth microservice
   * 1- send a request to /auth/verifytoken
   * 2- parse response received from their
   * 3- return Promise contain an object about user 
   * @param {string} token user jwt
   */
  getUserData(token) {
    return new Promise((resolve, reject) => {
      if(!token) 
        reject({});
      const _headers = {
        Authorization: `JWT ${token}`,
      }
      postRequst(endpoints.tokenValidation, {}, _headers)
        .then( ({email, fullname, }) => {
          resolve({ email, fullname, token, });
        })
        .catch( err => {
          reject({});
        })
    })
  }

}

export default User;