import React, { createContext, useReducer, useContext } from 'react';

export const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  name: null,
  token: null
};

// Actions
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';

// Action creators
export function loginSuccess(name) {
  return { type: LOGIN_SUCCESS, name };
}

export function loginFail(error) {
  return { type: LOGIN_FAIL, error };
}

export function logout() {
  return { type: LOGOUT };
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('name', JSON.stringify(action.payload.name));
      localStorage.setItem('token', JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        name: action.payload.name,
        token: action.payload.token
      };
    case 'LOGIN_FAIL':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        name: null
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        name: null
      };
    default:
      return state;
  }
};

function AuthProvider(props) {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  const authData = { auth, dispatch };

  return <AuthContext.Provider value={authData} {...props} />;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };
