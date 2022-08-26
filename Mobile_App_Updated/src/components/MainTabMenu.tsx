import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuScreen from '../screens/MenuScreen';
import CartScreen from '../screens/CartScreen';
import SettingsScreen from '../screens/SettingsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import CartProvider from '../functions/CartContext';

const Tab = createBottomTabNavigator();

const MainTabMenu = () => {
  return (
    <CartProvider>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'menu') {
              iconName = focused ? 'menu' : 'menu-outline';
            }
            if (route.name === 'cart') {
              iconName = focused ? 'cart' : 'cart-outline';
            }
            if (route.name === 'settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="menu"
          component={MenuScreen}
          options={{
            headerShown: true,
            title: 'Snacks',
            headerStyle: {backgroundColor: '#EFF1F7'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartScreen}
          options={{
            headerShown: true,
            title: 'Shopping Cart',
            headerStyle: {backgroundColor: '#EFF1F7'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
            // tabBarBadge: cart.length > 0 ? cart.length : '',
          }}
        />
        <Tab.Screen
          name="settings"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: 'Settings',
            headerStyle: {backgroundColor: '#EFF1F7'},
            headerTitleStyle: {
              fontSize: 30,
              fontWeight: 'bold',
            },
            headerTitleAlign: 'left',
          }}
        />
      </Tab.Navigator>
    </CartProvider>
  );
};

export default MainTabMenu;
