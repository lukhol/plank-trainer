import React, { Component } from 'react';
import { View, Image, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { Body, Card, CardItem, H2 } from 'native-base';
import H4 from '../components/H4';
import globalStyles from '../styles';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../common/colors';
import { LevelType, IconSize } from '../common/constants';

export default class TrainingItem extends Component {    
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.onPress(this.props.item.id)}>
                <Card style={styles.card}>
                    <H4>{this.props.item.name}</H4>    
                    <Image 
                        source={images.getById(this.props.item.id)}
                    />
                </Card>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        padding: 6
    }
});