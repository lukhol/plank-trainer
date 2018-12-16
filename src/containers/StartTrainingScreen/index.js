import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import TrainingItem from '../../components/TrainingItem';
import * as TrainingActions from '../../actions/TrainingActions';
import { Button } from 'native-base';

export class StartTrainingScreen extends Component {
    render() {
        return (
            <View style={globalStyles.container}>
                <FlatList
                    style={{flex:1}}
                    data={this.props.planks}
                    renderItem={(props) => 
                        <TrainingItem 
                            {...props} 
                        />
                    } 
                />
                <Button 
                    style={{height: 40,  margin: 6}}
                    full
                    onPress={() => {
                        this.props.chooseTrainingItems(this.props.planks);
                        this.props.navigation.navigate('TrainingScreen');
                    }}
                >
                    <Text style={globalStyles.textButton}>
                        Start training
                    </Text>
                </Button>
            </View>
        )
    }
}

function preparePlanks(state) {
    const levelPlanks = state.levels.levels.find(item => item.id === state.levels.choosenLevelId).planks;
    const allPlanks = state.planks;
    const propsPlanks = [];
    for(let i = 0 ; i < levelPlanks.length ; i ++) {
        const foundItem = allPlanks.find(item => item.id === levelPlanks[i].id);
        const newItem = {...foundItem, duration: levelPlanks[i].duration}
        if(foundItem) {
            propsPlanks.push(newItem);
        }
    }

    return propsPlanks;
}

const mapStateToProps = state => {
    return  {
        planks: preparePlanks(state),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseTrainingItems: (items) => dispatch(TrainingActions.chooseTrainingItems(items))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTrainingScreen);