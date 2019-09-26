import { postLogin } from "../../shared/services/auth";
import endpoints from "../config/endpoints";

class User {

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
      postLogin(endpoints.tokenValidation, {}, _headers)
        .then( ({email, fullname}) => {
          resolve({ email, fullname });
        })
        .catch( err => {
          reject({});
        })
    })
  }

}

export default User;