import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { YellowBox } from 'react-native';
import _ from 'lodash';

import Login from './components/Login/Login';
import Info from './Info';

const RootStack = createStackNavigator(
    {
        Login: Login,
        Info: Info,
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);



YellowBox.ignoreWarnings(['componentWillReceiveProps']);
const _console = _.clone(console);
console.warn = message => {
    if (message.indexOf('componentWillReceiveProps') <= -1) {
        _console.warn(message);
    } 
};

export default class App extends Component{
    render(){
        return(
            <RootStack />
        )
    }
}