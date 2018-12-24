import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions  } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome5';

class StepProgressbar extends Component {
    constructor(props) {
        super(props);
        this.getDoneItems = this.getDoneItems.bind(this);
        this.getActiveItem = this.getActiveItem.bind(this);
        this.getNotActiveItems = this.getNotActiveItems.bind(this);
        this.computeSuccessBarWidth = this.computeSuccessBarWidth.bind(this);

        this.props.itemsCount;
        this.props.activeItemIndex;

        this.activeItemsCount = this.props.activeItemIndex;
        this.activeItemIndex = this.props.activeItemIndex;
        this.notActiveItemsCount = this.props.itemsCount - this.activeItemsCount;
    }

    getDoneItems() {
        let doneItems = [];

        for(let i = 0 ; i < this.props.activeItemIndex; i++) {
            doneItems.push(
                <View style={[styles.item, styles.itemDone, this.props.doneDotStyle]}>
                    <Icon name='check' color='#fff' />
                </View>  
            )
        }

        return doneItems;
    }

    getActiveItem() {
        if(this.props.activeItemIndex === this.props.itemsCount) {
            return null;
        }

        return (
            <View style={[styles.item, styles.itemActive]}>
                <Text>{this.props.activeItemIndex + 1}</Text>
            </View>
        )
    }

    getNotActiveItems() {
        let notActiveItems = [];

        for(let i = this.props.activeItemIndex ; i < this.props.itemsCount - 1 ; i++) {
            notActiveItems.push( 
                <View style={styles.item}>
                    <Text>{i+2}</Text> 
                </View>
            );
        }

        return notActiveItems;
    }

    computeSuccessBarWidth() {
        let activeItemIndex = this.props.activeItemIndex > this.props.itemsCount 
            ? this.props.itemsCount : this.props.activeItemIndex;
        
        if(this.props.activeItemIndex === this.props.itemsCount) {
            activeItemIndex = this.props.itemsCount - 1;
        }

        if((this.props.activeItemIndex + 1 === this.props.itemsCount) ||
            (this.props.activeItemIndex === this.props.itemsCount)) {
            return '100%';
        }

        const screenWidth = Dimensions.get('window').width;
        const elementsSpace = (screenWidth*activeItemIndex)/(this.props.itemsCount);
        return this.props.activeItemIndex === 0 ? 0 : elementsSpace + (32);
    }

    render() {
        const successBarWidth = this.computeSuccessBarWidth();

        return (
            <View style={styles.container}>
                {this.getDoneItems()}
                {this.getActiveItem()}
                {this.getNotActiveItems()}
                <View style={styles.bar}></View>
                <View style={[styles.bar, styles.barSuccess, {width: successBarWidth}]}></View>
            </View>
        )
    }
}

StepProgressbar.propTypes = {
    itemsCount: PropTypes.number,
    activeItemIndex: PropTypes.number,
    doneDotStyle: PropTypes.object
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: "space-between",
        margin: 15
    },
    item: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#cecece',
        borderColor: '#989898',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    itemDone: {
        backgroundColor: '#46a01c',
        borderColor: '#488c28',
    },
    itemActive: {
        backgroundColor: '#80c16e',
    },
    bar: {
        height: 2,
        position: 'absolute',
        top: '50%',
        backgroundColor: '#cecece',
        width: '100%',
        zIndex: 1
    },
    barSuccess: {
        zIndex: 2,
        backgroundColor: '#46a01c'
    }
});

export default StepProgressbar;