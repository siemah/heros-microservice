/**
 * list of microservices communicate between booksapp with
 */

const mainAuth = `http://localhost:3004`;
const endpoints = {
  login: `${mainAuth}/auth/login`,
};

export default endpoints;
