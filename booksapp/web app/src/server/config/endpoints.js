/**
 * list of microservices communicate between booksapp with
 */

const mainAuth = `http://localhost:3004`;
const endpoints = {
  register: `${mainAuth}/auth/create`,
  login: `${mainAuth}/auth/login`,
  tokenValidation: `${mainAuth}/auth/verifytoken`,
};

export default endpoints;
