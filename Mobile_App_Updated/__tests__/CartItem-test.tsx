import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import CartItem from '../src/components/CartItem';
import * as CartProviderr from '../src/functions/CartContext';
import {CartItemType} from '../src/@types';
import {fireEvent, render} from '@testing-library/react-native';

describe('Tests for CartItem component.', () => {
  // Mocked CartContext
  const cart = [{name: 'snack', count: 2}];
  const addCartItem = jest.fn((index: number) => {
    console.log(index);
    cart[index].count++;
  });
  const minusCartItem = jest.fn((index: number) => {
    console.log(index);
    cart[index].count--;
  });
  const addToCart = (item: CartItemType) => console.log(item);
  const deleteFromCart = (item: CartItemType) => console.log(item);
  const emptyCart = () => console.log('empty');

  // THIS ONE WORKED!!!
  // This is what actually mocks the useCart hook
  jest.spyOn(CartProviderr, 'useCart').mockImplementation(() => ({
    cart,
    addCartItem,
    minusCartItem,
    addToCart,
    deleteFromCart,
    emptyCart,
  }));

  it('Renders correctly', () => {
    const tree = renderer
      .create(
        <CartProviderr.default>
          <CartItem item={0} key={0} />
        </CartProviderr.default>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Add a snack', () => {
    const {getByText} = render(
      <CartProviderr.default>
        <CartItem item={0} key={0} />
      </CartProviderr.default>,
    );
    let initial = cart[0].count;
    fireEvent.press(getByText('+'));
    let later = cart[0].count;
    expect(addCartItem).toBeCalled();
    expect(later > initial).toBe(true);
  });

  it('Subtract a snack', () => {
    const {getByText} = render(
      <CartProviderr.default>
        <CartItem item={0} key={0} />
      </CartProviderr.default>,
    );

    let initial = cart[0].count;
    let countDisplayed = getByText(initial.toString());
    expect(countDisplayed).toBeTruthy();

    fireEvent.press(getByText('-'));

    let later = cart[0].count;
    countDisplayed = getByText(later.toString());
    expect(countDisplayed).toBeTruthy();

    expect(minusCartItem).toBeCalled();
    expect(later < initial).toBe(true);
  });
});
