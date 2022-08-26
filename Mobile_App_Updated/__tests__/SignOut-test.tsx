/**
 * @format
 */
import 'react-native';
import SettingsPage from '../src/screens/SettingsScreen';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {AuthContext} from '../App';

jest.mock('../src/functions/helperFunctions', () => ({
  handleSignOut: () => {
    console.log('hello');
    return true;
  },
}));

describe('Settings page tests', () => {
  const signIn = jest.fn();
  const signUp = jest.fn();
  const signOut = jest.fn();

  test('user clicks sign out button', () => {
    const {getByText} = render(
      <AuthContext.Provider value={{signIn, signUp, signOut}}>
        <SettingsPage />
      </AuthContext.Provider>,
    );

    fireEvent.press(getByText('Sign Out'));
    expect(signOut).toBeCalled();
  });
});
