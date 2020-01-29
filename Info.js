import React, { Component } from "react";
import { View, Text, Button, TouchableOpacity, ActivityIndicator, StyleSheet, FlatList, Item } from "react-native";

export default class Info extends Component{
    constructor(props){
        super(props)
        this.state = { isLoading: true }
    }

    componentDidMount(){ // TODO: Update the navigator to be 3.xx or 4.xx
        const { navigation } = this.props
        const info = navigation.getParam('info', '');
        let user = info["username"]
        let pass = info["password"]

        fetch(`https://c3b4820b.ngrok.io/users`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: user,
                password: pass
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        })

        return fetch(`https://c3b4820b.ngrok.io/users/${user}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson,
                });
                console.log(this.state.dataSource)
            })
            .catch((error) =>{
                console.error("This is an error: " + error);
            });
    }

    render(){
        
        if(this.state.isLoading){
            return(
                <View style={styles.loadingSign}>
                    <ActivityIndicator />
                </View>
            )
        }
        
        return(
            <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.titleText}>Grade Details</Text>
            </View>
                <FlatList 
                    data={this.state.dataSource.data}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.flatList}
                    renderItem={({item}) => (
                        <View style={styles.item}>
                            <Text style={styles.itemText}>{item.name}: </Text>
                            <Text style={[styles.itemText, item.number == 0 ? styles.white : item.number >= 80 ? item.number >= 90 ? styles.green : styles.yellow : styles.red]}>{item.number}%</Text>
                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db',
        padding: 10
    },
    placeholderText: { 
        color: '#FFF',
        fontSize: 18,
    },
    loadingSign: {
        flex: 1,
        padding: 20,
        justifyContent: 'center'
    },
    flatList: {
        paddingTop: 30,
        flex: 1,
        // borderColor: '#FFF',
        // borderWidth: 1,
    },
    item: {
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemText: {
        fontSize: 18,
        color: '#FFF'
    },
    numberGrade:{
        fontSize: 18,
        color: '#FFF',
        opacity: .7
    },
    green: {
        color: '#00ff00'
    },
    yellow: {
        color: '#ffff00'
    },
    red: {
        color: '#ff0000'
    },
    white: {
        color: '#FFF'
    },
    title: {
        
    },
    titleText: {
        fontSize: 40,
        color: '#FFF'
    }
})