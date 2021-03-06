/* eslint-disable no-alert */
import React, {useState} from 'react';
import {auth} from '../firebase';
import {createUserWithEmailAndPassword} from 'firebase/auth';

import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';

const SignUpPage = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(userCredential.user.email);
        props.logInChange();
      })
      .catch(error => alert(error.message));
  };

  return (
    <View>
      <TextInput
        style={styles.phoneInput}
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.phoneInput}
        value={password}
        onChangeText={text => setPassword(text)}
        keyboardType="default"
        placeholder="Password"
        secureTextEntry
      />

      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPress={handleSignUp}>
        <Text style={styles.buttonText}>Verify</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default SignUpPage;
