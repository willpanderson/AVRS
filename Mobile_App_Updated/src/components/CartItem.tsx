import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {CartContextType} from '../@types';
import {useCart} from '../functions/CartContext';
import {onButtonPress} from '../functions/helperFunctions';

export default function CartItem(props: {item: number; key: number}) {
  const {cart, addCartItem, minusCartItem} = useCart() as CartContextType;

  const [count, setCount] = useState(cart[props.item].count);

  if (cart[props.item].count > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed ? {opacity: 0.8} : {},
            ]}
            onPress={() =>
              onButtonPress(addCartItem, setCount, props.item, cart)
            }>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>
          <Text>{count}</Text>

          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed ? {opacity: 0.8} : {},
            ]}
            onPress={() =>
              onButtonPress(minusCartItem, setCount, props.item, cart)
            }>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>

        <View style={styles.nameContainer}>
          <Text>{cart[props.item].name}</Text>
        </View>
      </View>
    );
  }
  return <></>;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    margin: 20,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  button: {
    backgroundColor: '#05111B',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    transform: [{scaleX: 1.5}],
    marginHorizontal: 15,
  },
  buttonText: {
    color: '#DBDDDF',
  },
});
