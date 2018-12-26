import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { Card } from 'native-base';
import * as Utils from '../utils';
import { Plank, Training } from '../models';
import H4 from '../components/H4';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LevelType, IconSize } from '../common/constants';
import Colors from '../common/colors';
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export interface Props {
    onPress (id: string): void,
    onDelete (id: string): void,
    item: Training
}

export default class LevelItem extends Component<Props, any> {  
    constructor(props: Props) {
        super(props);
        this.getLevelDuration = this.getLevelDuration.bind(this);
    }

    getLevelDuration() {
        try {
            return this.props.item.planks
                .map((plank: Plank) => plank.duration)
                .reduce((total: number, item: number) => total + item);
        } catch (e) {
            return -5;
        }
    }
    
    render() {
        return (
            <TouchableWithoutFeedback 
                onPress={() => this.props.onPress(this.props.item.id)}
            >
                <Card style={styles.card}>
                    <View style={styles.leftContainer}>
                        <View style={styles.title}>
                            <H4>{this.props.item.name}</H4>    
                        </View>
                        <View style={styles.timeContainer}>
                            <Icon name="clock" size={IconSize.SM} color={Colors.PRIMARY_LIGHT} />
                            <Text style={styles.description}>
                                {Utils.sec2time(this.getLevelDuration())}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rightContainer}>
                        
                    </View>
                    {
                        this.props.item.type === LevelType.CUSTOM &&  
                        <AnimatedTouchable 
                            onPress={() => this.props.onDelete(this.props.item.id)}
                            style={styles.trashTouchable}>
                            <View>
                                <Icon name="trash" size={20} color={Colors.DANGER} />
                            </View>
                        </AnimatedTouchable>
                    }
                </Card>
            </TouchableWithoutFeedback>
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
        padding: 6
    },
    timeContainer: {
        padding: 6,
        alignItems: "center",
        flexDirection: "row",
    },
    leftContainer: {
        flex: 3,
    },
    rightContainer: {
        flex: 2,
        alignItems: "center",
        justifyContent: "center"
    },
    trashTouchable: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: 35,
        width: 35, 
        alignItems:"center",
        justifyContent: "center"
    }
});