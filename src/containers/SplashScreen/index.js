import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';

export default class SplashScreen extends Component {
    componentDidMount() {
        this.props.navigation.navigate('RootScreen');
    }
    
    render() {
        return (
            <View style={globalStyles.container}>
                <ActivityIndicator 
                    color="green"
                    size="large" />
            </View>
        )
    }
}
