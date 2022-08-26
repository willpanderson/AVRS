import * as React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {AuthContextType} from '../@types';
import {AuthContext} from '../../App';

const InputFields = (props: {type: string | undefined}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn, signUp} = React.useContext(AuthContext) as AuthContextType;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.phoneInput}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholder="Email"
        autoCapitalize="none"
        autoFocus={true}
      />

      <TextInput
        style={styles.phoneInput}
        value={password}
        onChangeText={setPassword}
        keyboardType="default"
        placeholder="Password"
        secureTextEntry
      />

      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPress={() => {
          props.type === 'Sign Up'
            ? signUp(email, password)
            : signIn(email, password);
        }}>
        <Text style={styles.buttonText}>{props.type}</Text>
      </Pressable>
    </View>
  );
};

export default InputFields;

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
    padding: 10,
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
