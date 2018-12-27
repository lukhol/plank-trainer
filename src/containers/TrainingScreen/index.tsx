import React, { Component, Fragment } from 'react';
import { View, Image, Text, Dimensions , StyleSheet, TouchableOpacity } from 'react-native';
import globalStyles from '../../common/styles';
import { Card } from 'native-base';
import { connect } from 'react-redux';
import images from '../../common/images';
import { StepProgressbar } from '../../components';
import * as HistoryActions from '../../actions/HistoryActions';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconSize, Padding } from '../../common/constants';
import Colors from '../../common/colors';
import i18n from '../../translations/i18n';
import KeepAwake from 'react-native-keep-awake';
import { Training, HistoryItem, Plank } from '../../models';
import { RootState } from '../../reducers';

//Untyped modules
const Tts = require('react-native-tts');

export interface Props {
    defaultWaitTime: number,
    items: Plank[],
    sound: boolean,
    name: string, //TODO: why? am i missed something during porting to ts?
    saveTrainingHistory(historyItem: HistoryItem): any
}

export interface State {
    isRunning: boolean,
    first: boolean;
    index: number,
    timeLeft: number,
    isWaiting: boolean,
    waitTimeLeft: number,
    finish: boolean,
    started: boolean
}

export class TrainingScreen extends Component<Props, State> {
    private mounted: boolean = false;

    constructor(props: Props) {
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.onPlayPressed = this.onPlayPressed.bind(this);
        this.onPausePressed = this.onPausePressed.bind(this);
        this.secondElapsed = this.secondElapsed.bind(this);
        this.speachForWait = this.speachForWait.bind(this);
        this.speachForTrainingEnd = this.speachForTrainingEnd.bind(this);

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

        KeepAwake.activate();
        setInterval(this.secondElapsed, 1000);
    }

    componentWillUnmount() {
        this.mounted = false;
        KeepAwake.deactivate();
        clearInterval(this.secondElapsed as any); //TODO
    }

    speachForWait(waitTimeLeft: number) {
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

    speachForTrainingEnd(timeLeft: number) {
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
                    items: this.props.items,
                    name: this.props.name
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
        this.setState({isRunning: true});
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
                <Text style={{textAlign: 'center', fontSize: 18, margin: Padding.MD}}>
                    {i18n.t('trainingScreen.exerciseIndicator')} {content}
                </Text>
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
            <Fragment>
                <Text style={{...globalStyles.title, textAlign: "center", zIndex: 99, position: 'absolute', top: 0}}>
                    {this.props.items[currentInedx].name}
                </Text>
                <Image source={images.getById(this.props.items[currentInedx].id)}/>
            </Fragment>
        )
    }

    getBottom() {
        const { isWaiting, timeLeft, index, waitTimeLeft, finish, isRunning } = this.state;

        if(!isRunning) {
            return (
                <TouchableOpacity
                    style={styles.playIconTouchable}
                    onPress={this.onPlayPressed}
                >
                    <Icon name='play' color={Colors.SUCCESS} size={IconSize.LG} />
                </TouchableOpacity>
            );
        }

        return (
            finish ? 
                <Fragment>
                    <Text>{i18n.t('trainingScreen.finished')}</Text>
                    <Icon name ='flag-checkered' color={Colors.SUCCESS} size={IconSize.LG} />
                </Fragment>
                : 
                <Fragment>
                    <Text style={{...globalStyles.title, ...styles.timeText, flex: 1}}>
                        {isWaiting ? waitTimeLeft : timeLeft}
                    </Text>
                    <Text style={[globalStyles.title, styles.infoText]}>
                        {isWaiting ? i18n.t('trainingScreen.restMessage'): i18n.t('trainingScreen.trainingMessage')}
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

const screenWidth = Dimensions.get('window').width;
const size = Math.floor(screenWidth / 4);
const borderRadius = size / 2;

const styles = StyleSheet.create({
    topContainer: {
        alignItems: "stretch", 
        justifyContent: "flex-start",
        flex: 2
    }, 
    middleContainer: {
        alignItems: "center",
        justifyContent: 'center',
        flex: 3,
    },
    bottomContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 2,
    },
    timeText: {
        textAlign: 'center',
        fontSize: size / 3,
        color: Colors.PRIMARY,
        backgroundColor: '#fff',
        width: size,
        height: size,
        borderRadius: borderRadius
    },
    infoText: {
        paddingBottom: Padding.LG
    },
    playIconTouchable:{
        width: IconSize.LG+30,
        height: IconSize.LG+30,
        backgroundColor: '#fff',
        borderRadius: (IconSize.LG+30)/2,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 2
    }
});

const mapStateToProps = ({training, settings}: RootState) => ({
    items: training.items,
    name: training.name,
    defaultWaitTime: settings.defaultWaitTime,
    sound: settings.sound
});

const mapDispatchToProps = {
    saveTrainingHistory:HistoryActions.insert
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
(TrainingScreen);