/**
 * list of microservices communicate between booksapp with
 */

const mainAuth = `http://localhost:3004`;
const endpoints = {
  login: `${mainAuth}/auth/login`,
  tokenValidation: `${mainAuth}/auth/verifytoken`,
};

export default endpoints;
