import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import H4 from '../components/H4';
import images from '../images';

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