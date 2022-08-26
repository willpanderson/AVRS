import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as React from 'react';
import BackButton from '../components/BackButton';
import InputFields from '../components/InputFields';
// import {AuthContext} from './App';
// import type {StackScreenProps} from '@react-navigation/stack';

// type props = StackScreenProps<>

const AuthScreen = () => {
  const [inputType, setInputType] = React.useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../img/logo.png')} />

      {inputType !== '' && (
        <View style={styles.backButton}>
          <BackButton
            backPress={() => {
              setInputType('');
            }}
            args={''}
          />
        </View>
      )}

      <View style={styles.buttons}>
        {inputType === 'LOG_IN' && (
          //When user clicks login button
          <InputFields type="Login" />
        )}
        {inputType === 'SIGN_UP' && (
          //When user clicks signup button
          <InputFields type="Sign Up" />
        )}
        {inputType === '' && (
          <>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInputType('SIGN_UP')}
              testID={'signUp'}>
              <Text style={styles.buttonText}>Sign Up?</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setInputType('LOG_IN')}
              testID={'logIn'}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  defaultStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#377888',
  },
  image: {
    flex: 2,
    width: 250,
    resizeMode: 'contain',
  },
  buttons: {
    flex: 1,
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
  backButton: {
    //Absolute has to be applied in the view the component is mounted in
    position: 'absolute',
    top: 50,
    left: 50,
  },
});
