import React, { Component } from 'react';
import { View, Image, Text, FlatList, StyleSheet } from 'react-native';
import globalStyles from '../../styles';
import { Card } from 'native-base';
import { connect } from 'react-redux';
import images from '../../images';
import Tts from 'react-native-tts';
import * as HistoryActions from '../../actions/HistoryActions';
import Carousel, { Pagination } from 'react-native-snap-carousel';

export class TrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.secondElapsed = this.secondElapsed.bind(this);
        this.speachForWait = this.speachForWait.bind(this);
        this.speachForTrainingEnd = this.speachForTrainingEnd.bind(this);
        this.mounted;

        this.state = {
            first: true,
            index: 0,
            timeLeft: 0,
            isWaiting: true,
            waitTimeLeft: this.props.defaultWaitTime, 
            finish: false,
            entries: this.props.items
        };

        this._renderItem = this._renderItem.bind(this);
    }

    componentDidMount() {
        let timeLeft = this.props.items[this.state.index].duration;

        this.setState({
            timeLeft: timeLeft
        });

        this.mounted = true;

        setInterval(this.secondElapsed, 1000);
    }

    componentWillUnmount() {
        this.mounted = false;
        clearInterval(this.secondElapsed);
    }

    speachForWait(waitTimeLeft) {
        if(this.props.sound) {
            if(waitTimeLeft < 5 && waitTimeLeft !== 0) {
                if(waitTimeLeft - 1 === 0) {
                    Tts.speak('Start');
                } else {
                    Tts.speak(`${waitTimeLeft-1}`);
                }
            }
        }
    }

    speachForTrainingEnd(timeLeft) {
        if(this.props.sound) {
            if(timeLeft < 10 && timeLeft !== 0) {
                if(timeLeft - 1 === 0) {
                    Tts.speak('Odpoczynek');
                } else {
                    Tts.speak(`${timeLeft-1}`);
                }
            }
        }
    }

    secondElapsed() {
        const { isWaiting, timeLeft, index, waitTimeLeft, finish, first } = this.state;

        if(finish || !this.mounted) {
            return;
        }

        this.speachForWait(waitTimeLeft)

        if(isWaiting && waitTimeLeft > 0) {
            this.setState({
                waitTimeLeft: waitTimeLeft - 1
            });
            return;
        }

        if(isWaiting && waitTimeLeft === 0) {
            this.setState({
                isWaiting: false,
            });
            return;
        }

        if(!isWaiting && timeLeft > 0) {
            this.speachForTrainingEnd(timeLeft)

            this.setState({
                timeLeft: timeLeft - 1,
                first: false
            });
            return;
        }

        if(timeLeft === 0) {
            if(index == this.props.items.length - 1) {
                this.setState({
                    finish: true,
                    isWaiting: true,
                    waitTimeLeft: this.props.defaultWaitTime
                });

                this.props.saveTrainingHistory({
                    datetime: new Date().toISOString(),
                    items: this.props.items
                });
            } else {
                this.refs.carousel.snapToNext();
                this.setState({
                    index: index+1,
                    timeLeft: this.props.items[index+1].duration,
                    isWaiting: true,
                    waitTimeLeft: this.props.defaultWaitTime
                });
            }

            return;
        }
    }

    getProgress() {
        let content;
        if(this.props.items === undefined) {
            content = null;
        } else {
            content = `${this.state.index+1} / ${this.props.items.length}`;
        }

        return <Text style={globalStyles.title}>{content}</Text>;
    }

    _renderItem({item, index}) {
        return (
            <Card>
                <View>
                    <Text style={{...globalStyles.title, textAlign: "center"}}>
                        {item.name}
                    </Text>
                    <Image source={images.getById(item.id)}/>
                </View>
            </Card>
        )
    }

    getCenter() {
        return (
            <View style={{height: 300}}>
                <Carousel
                    layout={'stack'} 
                    layoutCardOffset={`18`}
                    ref={'carousel'}
                    data={this.state.entries}
                    renderItem={this._renderItem}
                    sliderWidth={200}
                    sliderHeight={200}
                    itemHeight={200}
                    itemWidth={200}
                    lockScrollWhileSnapping={true}
                />
                <Pagination
                    dotsLength={this.state.entries.length}
                    activeDotIndex={this.state.index}
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
                    dotStyle={{
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginHorizontal: 8,
                        backgroundColor: 'rgba(255, 255, 255, 0.92)'
                    }}
                    inactiveDotStyle={{
                        // Define styles for inactive dots here
                    }}
                    inactiveDotOpacity={0.4}
                    inactiveDotScale={0.6}
                />
            </View>
        )
    }

    getBottom() {
        const { isWaiting, timeLeft, index, waitTimeLeft, finish } = this.state;

        return (
            finish ? 
                <Text>Finish</Text> 
                : 
                (<View>
                    <Text style={globalStyles.title}>
                        {isWaiting ? "ODPOCZYNEK": `TRENING`}
                    </Text>
                    <Text style={{...globalStyles.title, textAlign: "center"}}>
                        {isWaiting ? waitTimeLeft : timeLeft}
                    </Text>
                </View>)
        )
    }

    render() {
        return (
            <View style={{...globalStyles.container, justifyContent: "space-around"}}>
                <View style={styles.topContainer}>
                    {this.getProgress()}
                </View>
                <View style={styles.middleContainer}>
                    {this.getCenter()}
                </View>
                <View style={styles.bottomContainer}>
                    {this.getBottom()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topContainer: {
        alignItems: "center", 
        justifyContent: "center"
    }, 
    middleContainer: {
        alignItems: "center"
    },
    bottomContainer: {
        alignItems: "center"
    }
});

const mapStateToProps = state => {
    return {
        items: state.training.items,
        defaultWaitTime: state.settings.defaultWaitTime,
        sound: state.settings.sound
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveTrainingHistory: (historyItem) => dispatch(HistoryActions.insert(historyItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScreen);