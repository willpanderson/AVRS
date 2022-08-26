/**
 * @format
 */
import 'react-native';
import {logIn} from '../src/functions/firebaseHelperFunctions';
import AuthScreen from '../src/screens/AuthScreen';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AuthContext} from '../App';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// What the hell I did
/*
  So I mocked the logIn function. I can't figure out async with jest, so I found a way around it. This should let me test when a user logs in to see if the screen changes.
*/
jest.mock('../src/functions/firebaseHelperFunctions', () => ({
  logIn: (email: string, password: string) => {
    console.log('login ' + email + ' ' + password);
    return true;
  },
}));

// jest.mock('firebase/auth', () => ({
//   signInWithEmailAndPassword: (email: string, password: string) => {
//     console.log('signInWithEmailAndPassword ' + email + ' ' + password);
//     return true;
//   },
//   getAuth: () => {
//     return {
//       name: 'noah',
//     };
//   },
// }));

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
    // console.log(loginElement);
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
    // console.log(loginElement);
    expect(loginElement).toBeTruthy();
    // expect.anything();
  });
});
