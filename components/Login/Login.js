import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, KeyboardAvoidingView, TouchableOpacity, StatusBar, TextInput } from "react-native";

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    render(){
        return(
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : null}
            >

                <View style={styles.logoContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../../VeracrossLogo.png')}
                    />

                    <Text style={styles.title}>
                        An Unofficial Veracross App
                    </Text>
                </View>


                <View style={styles.formContainer}>
                    <StatusBar 
                        barStyle="light-content"
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Username"
                        returnKeyType="next"
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={value => this.setState({username: value})}
                        value={this.state.username}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder="Password"
                        returnKeyType="done"
                        secureTextEntry
                        ref={(input) => this.passwordInput = input}
                        autoCapitalize="none"
                        autoCorrect={false}
                        onChangeText={value => this.setState({password: value})}
                        value={this.state.password}
                    />
                </View>


                <View style={styles.buttonViewContainer}>
                    <TouchableOpacity style={styles.buttonContainer} 
                    onPress={
                        () => {
                            this.props.navigation.navigate('Info', {info: this.state})
                        }
                    }>
                        <Text style={styles.buttonText} >Login</Text>
                    </TouchableOpacity>
                </View>
                    
            </KeyboardAvoidingView>
        );
    };
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer:{
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo:{
        width: 100,
        height: 100
    },
    title:{
        color: '#FFF',
        marginTop: 10,
        textAlign: 'center',
        opacity: 0.9,
        fontSize: 18
    },
    buttonContainer:{
        backgroundColor: '#2980b9',
        paddingVertical: 15,
    },
    buttonText:{
        textAlign: 'center',
        color: "#FFF",
        fontWeight: '700',
        opacity: 0.85,
        fontSize: 16
    },
    buttonViewContainer:{
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    formContainer:{
        padding: 20
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        marginBottom: 10,
        fontSize: 16
    },
});