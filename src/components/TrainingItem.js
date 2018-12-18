import React, { Component } from 'react';
import { View, Image, FlatList, Text, StyleSheet } from 'react-native';
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
            <Card style={styles.card}>
                <View style={styles.leftContainer}>
                    <H4>{this.props.item.name}</H4>    
                    <View style={styles.timeContainer}>
                        <Icon name="clock" size={IconSize.SM} color={Colors.PRIMARY_LIGHT} />
                        <Text style={styles.description}>
                            {Utils.sec2time(this.props.item.duration)}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
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
        flexDirection: "row",
        marginLeft: 10,
        marginRight: 10,
        padding: 6
    },
    leftContainer: {
        flex: 1,
        padding: 10
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 0,
        padding: 6
    },
    description: {
        padding: 6
    },
    timeContainer: {
        padding: 6,
        alignItems: "center",
        flexDirection: "row"
    },
});