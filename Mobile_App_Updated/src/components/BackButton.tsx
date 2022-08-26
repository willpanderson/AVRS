import {Pressable, StyleSheet, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
// import Icon from '';

const BackButton = (props: {
  backPress: (value?: React.SetStateAction<string>) => void;
  args?: string;
}) => {
  return (
    <View>
      <Pressable
        style={({pressed}) => [styles.button, pressed ? {opacity: 0.8} : {}]}
        onPress={() => props.backPress(props.args)}>
        <Icon name="chevron-back" size={35} />
      </Pressable>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
