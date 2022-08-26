import React, {useState} from 'react';

import {View, Text, StyleSheet} from 'react-native';

import NavBar from './NavBar';
import MenuPage from './MenuPage';
import SettingsPage from './SettingsPage';
import ShoppingCartPage from './ShoppingCartPage';

const MainMenu = props => {
  const [screen, setScreen] = useState('MENU');
  const [cart, setCart] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        {screen === 'MENU' && <MenuPage setOrder={setCart} curOrder={cart} />}
        {screen === 'LOCATION' && <Text>Location page</Text>}
        {screen === 'CART' && (
          <ShoppingCartPage cart={cart} setCart={setCart} />
        )}
        {screen === 'SETTINGS' && (
          <SettingsPage logInChange={props.logInChange} />
        )}
      </View>
      <View style={styles.navBarContainer}>
        {/* <Text>Hello world</Text> */}
        <NavBar screenChange={setScreen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFF1F7',
  },
  screenContainer: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'orange',
  },
  navBarContainer: {
    flex: 1,
    // position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'purple',
    width: '100%',
    // bottom: 70,
  },
  navBar: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default MainMenu;
