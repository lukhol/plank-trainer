import React, { Component, Fragment } from 'react';
import { View, Image, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles';
import { Card } from 'native-base';
import { connect } from 'react-redux';
import images from '../../images';
import Tts from 'react-native-tts';
import { StepProgressbar } from '../../components';
import * as HistoryActions from '../../actions/HistoryActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconSize, Padding } from '../../common/constants';
import Colors from '../../common/colors';

export class TrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.onPlayPressed = this.onPlayPressed.bind(this);
        this.onPausePressed = this.onPausePressed.bind(this);
        this.secondElapsed = this.secondElapsed.bind(this);
        this.speachForWait = this.speachForWait.bind(this);
        this.speachForTrainingEnd = this.speachForTrainingEnd.bind(this);
        this.mounted;

        this.state = {
            isRunning: false,
            first: true,
            index: 0,
            timeLeft: 0,
            isWaiting: true,
            waitTimeLeft: this.props.defaultWaitTime, 
            finish: false,
            started: false
        };
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
        const { isWaiting, timeLeft, index, waitTimeLeft, finish, started, isRunning } = this.state;

        if(!isRunning) {
            return;
        }

        if(finish || !this.mounted) {
            return;
        }

        this.speachForWait(waitTimeLeft)

        if(isWaiting && waitTimeLeft > 0) {
            this.setState({
                waitTimeLeft: waitTimeLeft - 1,
                started: true
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
                    waitTimeLeft: this.props.defaultWaitTime,
                    index: this.state.index + 1
                });

                this.props.saveTrainingHistory({
                    datetime: new Date().toISOString(),
                    items: this.props.items
                });
            } else {
                this.setState({
                    index: index + 1,
                    timeLeft: this.props.items[index+1].duration,
                    isWaiting: true,
                    waitTimeLeft: this.props.defaultWaitTime
                });
            }

            return;
        }
    }

    onPlayPressed() {
        this.setState({
            isRunning: true
        });
    }

    onPausePressed() {
        this.setState({
            isRunning: false
        });
    }

    getProgress() {
        let content;
        if(this.props.items === undefined) {
            content = null;
        } else {
            let actualIndex = this.state.index;
            if(this.state.index === this.props.items.length) {
                actualIndex = this.state.index - 1;
            }
            content = `${actualIndex + 1} / ${this.props.items.length}`;
        }

        return (
            <View>
                <Text style={{textAlign: 'center', fontSize: 18, margin: Padding.MD}}>Exercise {content}</Text>
                <StepProgressbar
                    style={{margin: Padding.MD}}
                    itemsCount={this.props.items.length}
                    activeItemIndex={this.state.index}
                />
            </View>
        );
    }

    getCenter() {
        let itemsCount = this.props.items.length;
        let currentInedx = this.state.index;

        if(currentInedx === itemsCount) {
            currentInedx = currentInedx - 1;
        }

        return (
            <View>
                <Text style={{...globalStyles.title, textAlign: "center"}}>
                    {this.props.items[currentInedx].name}
                </Text>
                <Image source={images.getById(this.props.items[currentInedx].id)}/>
            </View>
        )
    }

    getBottom() {
        const { isWaiting, timeLeft, index, waitTimeLeft, finish, isRunning } = this.state;

        if(!isRunning) {
            return (
                <TouchableOpacity
                    onPress={this.onPlayPressed}
                >
                    <Icon name='play' color={Colors.SUCCESS} size={IconSize.LG} />
                </TouchableOpacity>
            );
        }

        return (
            finish ? 
                <Fragment>
                    <Text>Finished</Text>
                    <Icon name ='flag-checkered' color={Colors.SUCCESS} size={IconSize.LG} />
                </Fragment>
                : 
                <Fragment>
                    <Text style={{...globalStyles.title, ...styles.timeText}}>
                        {isWaiting ? waitTimeLeft : timeLeft}
                    </Text>
                    <Text style={[globalStyles.title, styles.infoText]}>
                        {isWaiting ? "ODPOCZYNEK": `TRENING`}
                    </Text>
                    <View 
                        style={{position: 'absolute', margin: Padding.MD, bottom: 0, right: 0}}
                    >
                        <TouchableOpacity onPress={this.onPausePressed}>
                            <Icon name='pause' color={Colors.SUCCESS} size={IconSize.LG} />
                        </TouchableOpacity>
                    </View>
                </Fragment>
        )
    }

    render() {
        return (
            <View style={{...globalStyles.container, justifyContent: "flex-start", backgroundColor: Colors.ARROW}}>
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
        alignItems: "stretch", 
        justifyContent: "center",
        flex: 2,
        //borderWidth: 1, borderColor: 'red'
    }, 
    middleContainer: {
        alignItems: "center",
        justifyContent: 'center',
        flex: 3,
        //borderWidth: 1, borderColor: 'red'
    },
    bottomContainer: {
        alignItems: "center",
        justifyContent: 'center',
        flex: 2,
        //borderWidth: 1, borderColor: 'red'
    },
    timeText: {
        textAlign: 'center',
        fontSize: 45,
        color: Colors.PRIMARY
    },
    infoText: {
        paddingBottom: Padding.LG
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