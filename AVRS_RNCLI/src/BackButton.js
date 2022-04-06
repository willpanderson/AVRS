import React from 'react';
import PropTypes from 'prop-types';

import { Pressable, Text, View, StyleSheet } from 'react-native';

class BackButton extends React.Component {

    static propTypes = {
        backPress: PropTypes.func.isRequired,
    }

    render() {
        return (
            <View>
                <Pressable 
                    style={({ pressed }) => [
                        styles.button,
                        pressed ? { opacity: 0.8 } : {},
                    ]}
                    onPress={this.props.backPress}>
                    <Text>Back</Text>
                </Pressable>
            </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
        width: 50,
        backgroundColor: '#377888',
    },

})

export default BackButton;
