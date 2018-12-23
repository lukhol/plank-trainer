import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { Card, CardItem } from 'native-base';
import { Padding } from '../../common/constants';
import moment from 'moment';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

export class HistoryScreen extends Component {
    constructor(props) {
        super(props);
        this.nextPressed = this.nextPressed.bind(this);
        this.previousPressed = this.previousPressed.bind(this);
        this.isInRange = this.isInRange.bind(this);
        this.getDurationsInRage = this.getDurationsInRage.bind(this);
        this.state = {
            startOfWeek: moment().startOf('isoWeek').hours(0).minutes(0).seconds(0),
            endOfWeek: moment().endOf('isoWeek').hours(23).minutes(59).seconds(59),
            data: [0, 0, 0, 0, 0, 0, 0]
        }
    }

    componentDidMount() {
        this.setState({
            data: this.getDurationsInRage(this.props.historyList, this.state.startOfWeek, this.state.endOfWeek)
        });
    }

    nextPressed() {
        this.setState({
            startOfWeek: this.state.startOfWeek.add(7, 'days'),
            endOfWeek: this.state.endOfWeek.add(7, 'days'),
            data: this.getDurationsInRage(this.props.historyList, this.state.startOfWeek, this.state.endOfWeek)
        });
    }

    previousPressed() {
        this.setState({
            startOfWeek: this.state.startOfWeek.subtract(7, 'days'),
            endOfWeek: this.state.endOfWeek.subtract(7, 'days'),
            data: this.getDurationsInRage(this.props.historyList, this.state.startOfWeek, this.state.endOfWeek)
        });
    }

    isInRange(isoDateString, startDate, endDate) {
        const date = moment(isoDateString);
        return date.isAfter(startDate) && date.isBefore(endDate);
    }

    getDurationsInRage(historyList, startDate, endDate) {
        const itemsInDuration = historyList.filter(item => this.isInRange(item.datetime, startDate, endDate));
        let days = [1, 2, 3, 4, 5, 6, 7];
        days = days.map(day => {
            let duration = 0;
            for(let historyItem of itemsInDuration) {
                if(moment(historyItem.datetime).utc().isoWeekday() === day) {
                    duration += historyItem.items.map(i => i.duration).reduce((sum, item) => sum + item);
                }
            }

            return duration;
        });

        return days;
    }

    render() {
        return (
            <View style={{...globalStyles.container, padding: Padding.SM}}>
                <Card>
                    <LineChart 
                        data={{
                            labels: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
                            datasets: [{data: this.state.data}]
                        }}
                        width={Dimensions.get('window').width - 16} // from react-native
                        height={220}
                        chartConfig={{
                            backgroundColor: '#e26a00',
                            backgroundGradientFrom: '#fb8c00',
                            backgroundGradientTo: '#ffa726',
                            decimalPlaces: 2,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        }}
                        bezier
                        style={{elevation: 10}}
                    />
                    <View style={{justifyContent: "space-between", flexDirection: "row"}}>
                        <TouchableOpacity onPress={this.previousPressed} style={{padding: 14}}>
                            <Icon name="arrow-circle-left" size={20} color="#000" />
                        </TouchableOpacity>
                        <Text style={{alignSelf: "center"}}>
                            {this.state.startOfWeek.format('MMMM Do')} - {this.state.endOfWeek.format('MMMM Do')}
                        </Text>
                        <TouchableOpacity onPress={this.nextPressed} style={{padding: 14}}>
                            <Icon name="arrow-circle-right" size={20} color="#000" />
                        </TouchableOpacity>
                    </View>
                </Card>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        historyList: state.history.historyItems
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);