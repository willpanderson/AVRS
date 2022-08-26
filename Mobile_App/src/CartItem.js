import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';

export default function CartItem(props) {
  const [count, setCount] = useState(props.item.count);

  const onMinusPress = () => {
    console.log('clicked minus');
    setCount(count - 1);
    props.item.count = count - 1;
    console.log(props.item.count);
  };

  const onPlusPress = () => {
    console.log('clicked plus');
    setCount(count + 1);
    props.item.count = count + 1;
  };

  if (props.item.count > 0) {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsContainer}>
          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed ? {opacity: 0.8} : {},
            ]}
            onPress={() => onPlusPress()}>
            <Text style={styles.buttonText}>+</Text>
          </Pressable>

          <Text>{count}</Text>

          <Pressable
            style={({pressed}) => [
              styles.button,
              pressed ? {opacity: 0.8} : {},
            ]}
            onPress={() => onMinusPress()}>
            <Text style={styles.buttonText}>-</Text>
          </Pressable>
        </View>

        <View style={styles.nameContainer}>
          <Text>{props.item.name}</Text>
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
