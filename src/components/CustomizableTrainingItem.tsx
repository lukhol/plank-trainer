import React from 'react';
import { Component } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import H4 from './H4';
import images from '../images';
import * as Utils from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Colors from '../common/colors';
import { IconSize } from '../common/constants'

export interface Props {
    name: string,
    id: string,
    duration: number,
    sortHandlers: any,
    imageName: string,
    decrease(id: string): void,
    increase(id: string): void
}

export default class CustomizableTrainingItem extends Component<Props, any> {    
    render() {
        console.log('CustomizableTrainingItem ', this.props);
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
                            style={{maxHeight: 100, flex: 1}}
                            source={images.getById(this.props.imageName)}
                            resizeMode='contain'
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
        alignItems: 'stretch',
        justifyContent: 'flex-start',
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