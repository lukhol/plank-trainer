import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';

export class SplashScreen extends Component {
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

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);