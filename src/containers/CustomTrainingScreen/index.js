import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import { Button, Toast, Spinner } from 'native-base';
import CustomizeTrainingItem from '../../components/CustomizeTrainingItem';
import * as LevelsActions from '../../actions/LevelsActions';
import { sec2time } from '../../utils'

export class CustomTrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.saveTraining = this.saveTraining.bind(this);
        this.increaseDuration = this.increaseDuration.bind(this);
        this.decreaseDuration = this.decreaseDuration.bind(this);
        const planks = [...this.props.planks].map(item => {return {...item, duration: 0}});
        this.state = {
            name: '',
            planks: planks
        };
    }

    saveTraining() {
        let planksForLevel = this.state.planks.filter(item => item.duration > 0);
        
        if(this.state.name === '') {
            Toast.show({
                text: 'Name cannot be empty.',
                buttonText: 'Ok',
                type: 'warning'
            });
            return;
        }

        if(planksForLevel === undefined) {
            Toast.show({
                text: 'Choose at least one item',
                buttonText: 'Ok',
                type: 'warning'
            });
            return;
        }

        let customLevel = {
            name: this.state.name,
            type: 'CUSTOM',
            planks: planksForLevel
        };

        this.props.insert(customLevel);
        this.props.navigation.navigate('LevelsScreen');

        alert('Level added successfylly');
        this.setState({
            planks: [...this.props.planks].map(item => {return {...item, duration: 0}})
        });
    }

    increaseDuration(id) {
        this.setState({
            planks: this.state.planks.map(i => {
                if(i.id === id) {
                    const newDuration = (i.duration + 5);
                    return {...i, duration: newDuration};
                }

                return i;
            })
        });
    }

    decreaseDuration(id) {
        this.setState({
            planks: this.state.planks.map(i => {
                if(i.id === id) {
                    if(i.duration > 0) {
                        const newDuration = (i.duration - 5);
                        return {...i, duration: newDuration};
                    }
                }

                return i;
            })
        });
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <TextInput 
                    style={{backgroundColor: "#fff", margin: 16}}
                    placeholder="Level name..."
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}/>
                <FlatList 
                    style={{flex:1}} 
                    data={this.state.planks}
                    renderItem={(props) => 
                        <CustomizeTrainingItem 
                            {...props} 
                            increase={this.increaseDuration}
                            decrease={this.decreaseDuration}
                        />
                    } />
                <Button 
                    style={{height: 40,  margin: 6}}
                    full
                    success
                    onPress={this.saveTraining}
                >
                    <Text style={globalStyles.textButton}>
                        Save ({sec2time(this.state.planks.reduce((sum, item, index) => {
                            if(index === 1) {
                                return sum.duration;
                            }

                            return sum + item.duration;
                        }))})
                    </Text>
                </Button>
                {this.props.isLoading && 
                <View style={{elevation:2, zIndex: 900, flex:1, width: "100%", height: "100%", position: 'absolute', alignItems: "center", justifyContent: "center", backgroundColor:"#00000077"}}>
                    <Spinner color="red" />
                </View>}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        planks: state.planks,
        isLoading: state.levels.isFethingCustom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        insert: (level) => dispatch(LevelsActions.insert(level))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTrainingScreen);