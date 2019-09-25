import { createContext, } from 'react';

export const authContextDefaultValue = {
  email: null,
  fullname: null,
};

const AuthContext = createContext(authContextDefaultValue);

export const AuthProvider = AuthContext.Provider;

export default AuthContext;