import React from 'react';
import PropTypes from 'prop-types';

import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import BackButton from './BackButton';

class HomePage extends React.Component {

    static propTypes = {
        logInChange: PropTypes.func.isRequired,
    }

    state = {
        signUp: false,
        login: true,
        logedIn: true,
    }

    signUpPress = () => {
        //The key for changing the state is the setState function!!!
        this.setState({
            signUp: true
        });
    };

    loginPress = () => {
        this.setState({
            login: true
        });
    };

    backPress = () => {
        this.setState({
            signUp: false,
            login: false,
        });
    }

    render() {

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('./img/logo.png')} />
                {(this.state.login == true || this.state.signUp == true) && (
                    <View style={styles.backButton}>
                        <BackButton backPress={this.backPress} />
                    </View>
                )}

                <View style={styles.buttons}>

                    {this.state.login == true && (
                        //When user clicks login button
                        <LoginPage logInChange={this.props.logInChange} />
                    )}
                    {this.state.signUp == true && (
                        //When user clicks signup button
                        <SignUpPage logInChange={this.props.logInChange} />
                    )}
                    {(this.state.signUp == false && this.state.login == false) && (
                        <>
                            <TouchableOpacity style={styles.button} onPress={this.signUpPress}>
                                <Text style={styles.buttonText}>Sign Up?</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={this.loginPress}>
                                <Text style={styles.buttonText}>Login</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </View>
            </View>
        )
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
    backButton: {
        //Absolute has to be applied in the view the component is mounted in
        position: 'absolute',
        top: 50,
        left: 50,
    },
})

export default HomePage;