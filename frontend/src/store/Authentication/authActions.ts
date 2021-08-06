import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios, { AxiosResponse } from 'axios';

import { RootState } from '..';
import authSlice from './authSlice';
import { LogInData, RegisterData } from '../types';

export const authActions = authSlice.actions;

export const logUserIn = (data: LogInData): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async dispatch => {
    const sendRequest = async () => {
      const response: AxiosResponse<{ jwt: string }> = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          login: data.userName,
          password: data.password,
        },
      );
      const { jwt } = response.data;
      return jwt;
    };

    try {
      const token = await sendRequest();
      dispatch(authActions.logIn(data.userName));
      localStorage.setItem('jwt', token);
      localStorage.setItem('userName', data.userName);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const registerUser = (
  data: RegisterData,
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async dispatch => {
    const sendRequest = async () => {
      const response: AxiosResponse = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name: data.firstName,
          surname: data.lastName,
          login: data.userName,
          password: data.password,
        },
      );
      const { refreshToken } = response.data;
      return refreshToken;
    };

    try {
      const token = await sendRequest();
      dispatch(authActions.logIn(data.userName));
      localStorage.setItem('jwt', token);
      localStorage.setItem('userName', data.userName);
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logUserOut = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return dispatch => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userName');
    dispatch(authActions.logOut());
  };
};

export const autoLogIn = (): ThunkAction<void | undefined, RootState, unknown, AnyAction> => {
  return dispatch => {
    const token = localStorage.getItem('jwt');
    if (!token) return;
    else {
      const userName = localStorage.getItem('userName');
      if (userName) dispatch(authActions.logIn(userName));
    }
  };
};
