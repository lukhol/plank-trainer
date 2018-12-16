import React, { Component } from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
import { Body, Card, Button, H2 } from 'native-base';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default class LevelItem extends Component {  
    constructor(props) {
        super(props);
        this.getLevelDuration = this.getLevelDuration.bind(this);
    }

    getLevelDuration() {
        return this.props.item.planks
            .map(i => i.duration)
            .reduce((total, item) => total + item);
    }
    
    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.outerContainer}>
                    <View style={styles.leftContainer}>
                        <View style={styles.title}>
                            <H2>Level {this.props.index + 1}</H2>    
                        </View>
                        <View style={styles.timeContainer}>
                            <Icon name="clock" size={30} color="#42f462" />
                            <Text style={styles.description}>
                                {Utils.sec2time(this.getLevelDuration())}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Button 
                            block 
                            success 
                            style={{margin: 16}}
                            onPress={() => this.props.onPress(this.props.item.id)}
                       >
                            <Text style={{color: "#fff"}}>
                                Przeglądaj
                            </Text>
                        </Button>
                    </View>
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
    description: {
        padding: 6
    },
    title: {
        padding: 10
    },
    timeContainer: {
        padding: 10,
        alignItems: "center"
    },
    outerContainer: {
        flex: 1,
        flexDirection: "row"
    },
    leftContainer: {

    },
    rightContainer: {
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
});