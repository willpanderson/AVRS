export type RootStackParamList = {
  splash: undefined;
  auth: undefined;
  tabMenu: undefined;
};

export type AuthContextType = {
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  signUp: (email: string, password: string) => void;
};

export type AuthContextTypeTwo = {
  signIn: (
    email: string,
    password: string,
    dispatch: (arg0: {type: string; token: string}) => void,
    storeUserSession: () => void,
  ) => void;
  signOut: (
    removeItem: (arg0: string) => void,
    dispatch: (arg0: {type: string; token: undefined}) => void,
  ) => void;
  signUp: (
    email: string,
    password: string,
    dispatch: (arg0: {type: string; token: string}) => void,
    storeUserSession: () => void,
  ) => void;
};

export type CartItemType = {
  name: string;
  count: number;
};

export type CartContextType = {
  addToCart: (item: CartItemType) => void;
  addCartItem: (index: number) => void;
  minusCartItem: (index: number) => void;
  deleteFromCart: (item: CartItemType) => void;
  emptyCart: () => void;
  cart: Array<CartItemType>;
};

export type SnackType = {
  Name: string;
  Reserved: number;
  Total: number;
  image: string;
};

export interface ParentCompProps {
  children?: React.ReactNode;
}
