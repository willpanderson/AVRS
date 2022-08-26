import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

import {auth} from '../firebase';
import {signOut} from 'firebase/auth';

export default function SettingsPage(props) {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign out');
        props.logInChange();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Settings</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
          onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    flex: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  header: {
    margin: 10,
    fontSize: 30,
    fontWeight: 'bold',
  },
  phoneInput: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#B6C7CC',
    width: 200,
    height: 50,
    borderRadius: 10,
    margin: 15,
    bottom: 100,
  },
  verify: {
    width: 200,
    height: 50,
    backgroundColor: '#05111B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 15,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#05111B',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 15,
  },
  buttonText: {
    color: '#DBDDDF',
  },
});
