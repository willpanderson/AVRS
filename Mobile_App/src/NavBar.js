import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
//Navbar shown in main menu
//Main menu will keep track of state to show which screen to show
//Navbar updates the state in Main menu

export default function NavBar(props) {
  const clickButton = screenName => {
    props.screenChange(screenName);
    console.log('NavBar.js\tscreen successfully changed ' + screenName);
  };

  return (
    <View style={styles.navBar}>
      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPressIn={() => {
          clickButton('MENU');
        }}>
        <Text>Menu</Text>
      </Pressable>
      {/* <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? { opacity: 0.8 } : {},
                ]}
                onPressIn={() => {
                    clickButton("LOCATION")
                }}>
                <Text>Location</Text>
            </Pressable> */}
      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPressIn={() => {
          clickButton('CART');
        }}>
        <Text>Cart</Text>
      </Pressable>
      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPressIn={() => {
          clickButton('SETTINGS');
        }}>
        <Text>Settings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    backgroundColor: 'white',
  },
});
