import React, { Component } from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
import { Body, Card, CardItem, H2 } from 'native-base';
import globalStyles from '../styles';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class TrainingItem extends Component {    
    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.title}>
                    <H2>{this.props.item.name}</H2>    
                </View>
                <View style={styles.body}>
                    <View style={styles.timeContainer}>
                        <Icon name="clock" size={30} color="#42f462" />
                        <Text style={styles.description}>
                            {Utils.sec2time(this.props.item.duration)}
                        </Text>
                    </View>
                    <Image 
                        source={images.getById(this.props.item.id)}
                    />
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        marginLeft: 10,
        marginRight: 10,
        padding: 6
    },
    body: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 0,
        padding: 6
    },
    description: {
        //alignSelf: "center"
        padding: 6
    },
    title: {
        padding: 10
    },
    timeContainer: {
        padding: 10,
        alignItems: "center"
    }
});