import React, { Component } from 'react';
import { View, Image, Text, FlatList, StyleSheet, ActivityIndicator, H2 } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import images from '../../images';
import TrainingItem from '../../components/TrainingItem';
import { Button } from 'native-base';

export class TrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.getProgress = this.getProgress.bind(this);
        this.getCenter = this.getCenter.bind(this);
        this.getBottom = this.getBottom.bind(this);
        this.secondElapsed = this.secondElapsed.bind(this);
        this.mounted;

        this.state = {
            first: true,
            index: 0,
            timeLeft: 0,
            isWaiting: true,
            waitTimeLeft: this.props.defaultWaitTime, 
            finish: false
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
        clearInterval(this.secondElapsed, 1000);
    }

    secondElapsed() {
        const { isWaiting, timeLeft, index, waitTimeLeft, finish, first } = this.state;

        if(finish || !this.mounted) {
            return;
        }

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
            } else {
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

    getCenter() {
        return (
            <View>
                <Text style={{...globalStyles.title, textAlign: "center"}}>
                    {this.props.items[this.state.index].name}
                </Text>
                <Image source={images.getById(this.props.items[this.state.index].id)}/>
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
        defaultWaitTime: state.settings.defaultWaitTime
    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainingScreen);