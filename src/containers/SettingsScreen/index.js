import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';

export class SettingsScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>
                    Settings Screen
                </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);