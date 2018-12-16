import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles';

export default class CustomTrainingScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <Text>
                    Custom training screen
                </Text>
            </View>
        )
    }
}
