import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import H4 from './H4';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../common/colors';
import { IconSize } from '../common/constants';
import { Plank } from '../models';

export interface TrainingItemProps {
    item: Plank 
}

export default class TrainingItem extends Component<TrainingItemProps, any> {    
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
                        style={{maxHeight: 150, flex: 1}}
                        source={images.getById(this.props.item.id)}
                        resizeMode='contain'
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
        padding: 10
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: 'stretch',
        justifyContent: 'flex-start',
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