import 'react-native';
import {logIn} from '../src/functions/firebaseHelperFunctions';
import AuthScreen from '../src/screens/AuthScreen';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AuthContext} from '../App';

jest.mock('../src/functions/firebaseHelperFunctions', () => ({
  logIn: (email: string, password: string) => {
    console.log('login ' + email + ' ' + password);
    return true;
  },
}));

describe('log in thing', () => {
  test('testing logIn function', () => {
    console.log('hello');
    let value = logIn('noahmatwalker@gmail', 'password');
    expect(value).toBe(true);
  });

  test('shown AuthScreen user can click Login button', () => {
    const signIn = jest.fn();
    const signUp = jest.fn();
    const signOut = jest.fn();
    const {getByText, queryByPlaceholderText} = render(
      <AuthContext.Provider value={{signIn, signUp, signOut}}>
        <AuthScreen />
      </AuthContext.Provider>,
    );

    fireEvent.press(getByText('Login'));
    const loginElement = queryByPlaceholderText('Email');
    expect(loginElement).toBeTruthy();
  });

  test('shown AuthScreen user can click Sign Up? button', () => {
    const signIn = jest.fn();
    const signUp = jest.fn();
    const signOut = jest.fn();
    const {getByText, queryByPlaceholderText} = render(
      <AuthContext.Provider value={{signIn, signUp, signOut}}>
        <AuthScreen />
      </AuthContext.Provider>,
    );

    fireEvent.press(getByText('Sign Up?'));
    const loginElement = queryByPlaceholderText('Email');
    expect(loginElement).toBeTruthy();
  });
});
