import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import H4 from '../components/H4';
import images from '../images';

export interface Props {
    onPress: any,
    item: any
}

export interface State {

}

export default class TrainingItem extends Component<Props, State> {    
    render() {
        return (
            <TouchableWithoutFeedback
                onPress={() => this.props.onPress(this.props.item.id)}>
                <Card style={styles.card}>
                    <H4>{this.props.item.name}</H4>    
                    <Image 
                        style={{maxHeight: 120, flex: 1}}
                        source={images.getById(this.props.item.id)}
                        resizeMode='contain'
                    />
                </Card>
            </TouchableWithoutFeedback>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        alignItems: "center",
        justifyContent: "flex-start",
        marginLeft: 10,
        marginRight: 10,
        padding: 6,
        height: 150
    }
});