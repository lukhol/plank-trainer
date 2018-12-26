import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SectionList } from 'react-native';
import globalStyles from '../../styles';
import { LineChart } from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
import { Card, CardItem } from 'native-base';
import { Padding } from '../../common/constants';
import moment, { Moment } from 'moment';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import i18n from '../../translations/i18n';
import { HistoryItem } from '../../models';
import { RootState } from '../../reducers';

export interface Props {
    historyList: Array<HistoryItem>
}

export interface State {
    startOfWeek: Moment,
    endOfWeek: Moment,
    data: Array<number>
}

export class HistoryScreen extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.nextPressed = this.nextPressed.bind(this);
        this.previousPressed = this.previousPressed.bind(this);
        this.isInRange = this.isInRange.bind(this);
        this.prepareHistorySections = this.prepareHistorySections.bind(this);
        this.getDurationsInRage = this.getDurationsInRage.bind(this);
        this.historySectionListContent = this.historySectionListContent.bind(this);
        this.historySectionListHeader = this.historySectionListHeader.bind(this);
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

    isInRange(isoDateString: string, startDate: Moment, endDate: Moment) {
        const date = moment(isoDateString);
        return date.isAfter(startDate) && date.isBefore(endDate);
    }

    getDurationsInRage(historyList: Array<HistoryItem>, startDate: Moment, endDate: Moment) {
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

    prepareHistorySections() {
        return [
            {
                title: 'Sekcja 1',
                data: this.props.historyList.filter(item => this.isInRange(item.datetime, this.state.startOfWeek, this.state.endOfWeek))
            }
        ];
    }

    historySectionListHeader(props: any) {
        return (
            <CardItem header bordered>
                <Text>This week trainings:</Text>
            </CardItem>
        )
    }

    historySectionListContent(props: any) {
        return (
            <CardItem>
                <Text>{props.item.name}</Text>
            </CardItem>
        )
    }

    render() {
        return (
            <View style={{...globalStyles.container}}>
                <ScrollView style={{flex: 1, paddingHorizontal: Padding.SM, marginVertical: Padding.SM}}>
                    <Card>
                        <LineChart 
                            data={{
                                labels: [
                                    i18n.t('common.weekdays.mon'), 
                                    i18n.t('common.weekdays.tue'), 
                                    i18n.t('common.weekdays.wed'), 
                                    i18n.t('common.weekdays.thu'), 
                                    i18n.t('common.weekdays.fri'), 
                                    i18n.t('common.weekdays.sat'), 
                                    i18n.t('common.weekdays.sun')
                                ],
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
                    {this.props.historyList.length > 0 
                    ? 
                    <Card style={{margin: Padding.LG}}>
                        <SectionList 
                            style={{flex: 1}}
                            sections={this.prepareHistorySections()}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.historySectionListContent}
                            renderSectionHeader={this.historySectionListHeader}
                        />
                    </Card> : null}
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = ({history}: RootState) => ({
    historyList: history.historyItems
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(HistoryScreen);