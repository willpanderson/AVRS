import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Button, StyleSheet } from 'react-native';

import HomePage from './HomePage';
import MainMenu from './MainMenu';
import { func } from 'prop-types';


class App extends React.Component {
    state = {
        isLoggedIn: true,
    };

    logInOut = () => {
        let loggedIn = !this.state.isLoggedIn;
        this.setState({
            isLoggedIn: loggedIn,
        });
        console.log(this.state.isLoggedIn);
    };

    render() {
        if (this.state.isLoggedIn == true) {
            return <MainMenu logInChange={this.logInOut}/>
        } else {
            return (
                <HomePage logInChange={this.logInOut} />
            )
        }

    }
}

const styles = StyleSheet.create({
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
})

export default App;