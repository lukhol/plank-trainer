import React, { Component } from 'react';
import { View, Image, FlatList, Text, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, H2 } from 'native-base';
import H4 from '../components/H4';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../common/colors';
import { IconSize } from '../common/constants'

export default class CustomizeTrainingItem extends Component {    
    render() {
        return (
            <TouchableOpacity
                {...this.props.sortHandlers}>
                <Card style={styles.card}>
                    <View style={styles.leftContainer}>
                        <H4>{this.props.name}</H4>    
                        <View style={styles.timeContainer}>
                            <TouchableOpacity onPress={() => this.props.decrease(this.props.id)}>
                                <Icon name="minus" size={IconSize.MD} color={Colors.WARNING} />
                            </TouchableOpacity>
                            <Text style={styles.description}>
                                {Utils.sec2time(this.props.duration)}
                            </Text>
                            <TouchableOpacity onPress={() => this.props.increase(this.props.id)}>
                                <Icon name="plus" size={IconSize.MD} color={Colors.WARNING} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        <Image 
                            source={images.getById(this.props.imageName)}
                        />
                    </View>
                </Card>
            </TouchableOpacity>
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
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 0,
        padding: 6
    },
    description: {
        padding: 6,
        fontSize: 19
    },
    leftContainer: {
        flex: 1,
        padding: 10
    },
    timeContainer: {
        flexDirection: "row",
        padding: 10,
        alignItems: "center"
    }
});