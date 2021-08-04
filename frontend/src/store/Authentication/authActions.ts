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
      const response: AxiosResponse<{ jwt: string }> = await axios.post(
        'http://localhost:5000/api/auth/register',
        {
          name: data.firstName,
          surname: data.lastName,
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
    } catch (error) {
      console.log(error.message);
    }
  };
};

export const logUserOut = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return dispatch => {
    localStorage.removeItem('jwt');
    dispatch(authActions.logOut());
  };
};
