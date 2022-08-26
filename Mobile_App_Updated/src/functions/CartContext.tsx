import React from 'react';
import {CartContextType, CartItemType, ParentCompProps} from '../@types';

const CartContext = React.createContext<CartContextType | null>(null);

export const useCart = () => React.useContext(CartContext);

const CartProvider: React.FC<ParentCompProps> = ({children}) => {
  const [cart, setCart] = React.useState<CartItemType[]>([]);

  const addToCart = (item: CartItemType) => {
    console.log('add to cart ' + item);
    setCart([...cart, item]);
    console.log(cart);
  };

  const addCartItem = (index: number) => {
    console.log('add 1 to count for ' + cart[index].name);
    cart[index].count++;
    console.log(cart[index].count);
  };

  const minusCartItem = (index: number) => {
    console.log('subtract 1 to count for ' + cart[index].name);
    cart[index].count--;
    console.log(cart[index].count);
    if (cart[index].count < 1) {
      deleteFromCart(cart[index]);
    }
  };

  const deleteFromCart = (item: CartItemType) => {
    console.log('Deleting ' + item.name + ' from cart');
    setCart(cart.filter(items => items.name !== item.name));
    console.log(cart);
  };

  const emptyCart = () => {
    setCart([]);
    console.log('Empty cart');
    console.log(cart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addCartItem,
        minusCartItem,
        deleteFromCart,
        emptyCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
