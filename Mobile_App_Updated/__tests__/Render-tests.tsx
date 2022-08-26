/**
 * @format
 */

import 'react-native';
import React from 'react';
import App, {AuthContext} from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AuthScreen from '../src/screens/AuthScreen';
import CartScreen from '../src/screens/CartScreen';
import MenuScreen from '../src/screens/MenuScreen';
import SettingsScreen from '../src/screens/SettingsScreen';
import CartProvider from '../src/functions/CartContext';
import MockTabMenu from '../__mocks__/MockTabMenu';

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

describe('Testing if screens will render', () => {
  it('App renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('AuthScreen renders correctly', () => {
    const tree = renderer.create(<AuthScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('CartScreen renders correctly', () => {
    // const useIsFocused = jest.fn();

    jest.mock('@react-navigation/native', () => ({
      useIsFocused: () => true,
    }));

    // const useIsFocussed = jest.fn();

    jest.mock('@react-navigation/native', () => {
      const actualNav = jest.requireActual('@react-navigation/native');
      return {
        ...actualNav,
        useIsFocussed: jest.fn(),
      };
    });

    const tree = renderer
      .create(
        <CartProvider>
          <MockTabMenu component={CartScreen} />
        </CartProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('MenuScreen renders correctly', () => {
    const tree = renderer
      .create(
        <CartProvider>
          <MenuScreen />
        </CartProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  const signIn = jest.fn();
  const signUp = jest.fn();
  const signOut = jest.fn();
  it('SettingsScreen renders correctly', () => {
    const tree = renderer
      .create(
        <AuthContext.Provider value={{signIn, signUp, signOut}}>
          <SettingsScreen />
        </AuthContext.Provider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
