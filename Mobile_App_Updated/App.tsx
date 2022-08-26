import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EncryptedStorage from 'react-native-encrypted-storage';
import AuthScreen from './src/screens/AuthScreen';
import MainTabMenu from './src/components/MainTabMenu';
import {AuthContextType, RootStackParamList} from './src/@types';
import {
  createAccount,
  handleSignOut,
  logIn,
} from './src/functions/firebaseHelperFunctions';
import LoadingScreen from './src/screens/LoadingScreen';

export const AuthContext = React.createContext<AuthContextType | null>(null);

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: {type: any; token: any}) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootStrapAsync = async () => {
      let userToken;
      try {
        userToken = await EncryptedStorage.getItem('usser_session');
        if (userToken !== undefined) {
          console.log(userToken);
        }
      } catch (error) {
        console.log(error);
      }
      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootStrapAsync();
  }, []);

  const storeUserSession = async () => {
    console.log('Setting user session');
    try {
      await EncryptedStorage.setItem(
        'usser_session',
        JSON.stringify({
          token: 'ACCESS_TOKEN',
        }),
      );
      console.log('Store token');
    } catch (error) {
      console.log(error);
    }
  };

  const authContext = React.useMemo(
    () => ({
      signIn: async (email: string, password: string) => {
        console.log(email + password);
        let value = await logIn(email, password);
        if (value) {
          dispatch({type: 'SIGN_IN', token: 'bob'});
          storeUserSession();
        }
        console.log(value);
      },
      signOut: () => {
        try {
          EncryptedStorage.removeItem('usser_session');
          console.log('removes session');
        } catch (error) {
          console.log(error);
        }
        handleSignOut();
        dispatch({
          type: 'SIGN_OUT',
          token: undefined,
        });
      },
      signUp: async (email: string, password: string) => {
        console.log(email + password);
        let value = await createAccount(email, password);
        if (value) {
          dispatch({type: 'SIGN_IN', token: 'bob'});
          storeUserSession();
        }
      },
    }),
    [],
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            <Stack.Screen name="splash" component={LoadingScreen} />
          ) : state.userToken == null ? (
            <Stack.Screen
              name="auth"
              component={AuthScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="tabMenu"
              component={MainTabMenu}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
