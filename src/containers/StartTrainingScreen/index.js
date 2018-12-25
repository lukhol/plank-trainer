import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import TrainingItem from '../../components/TrainingItem';
import * as TrainingActions from '../../actions/TrainingActions';
import { Button } from 'native-base';
import i18n from '../../translations/i18n';

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
                    success
                    onPress={() => {
                        this.props.chooseTrainingItems(this.props.planks, this.props.displayingLevel.name);
                        this.props.navigation.navigate('TrainingScreen');
                    }}
                >
                    <Text style={globalStyles.textButton}>
                        {i18n.t('startTrainingScreen.startButton')}
                    </Text>
                </Button>
            </View>
        )
    }
}

function preparePlanks(allPlanks, levels, customLevels, choosenLevelId) {
    let levelToDisplay = levels.find(item => item.id === choosenLevelId);
    if(!levelToDisplay) {
        //If not found in default search in custom
        levelToDisplay = customLevels.find(item => item.id === choosenLevelId);
    }
    let planks = levelToDisplay.planks;
    const propsPlanks = [];
    for(let i = 0 ; i < planks.length ; i ++) {
        const foundItem = allPlanks.find(item => item.id === planks[i].imageName);
        const newItem = {...foundItem, duration: planks[i].duration}
        if(foundItem) {
            propsPlanks.push(newItem);
        }
    }

    return {
        planks: propsPlanks,
        displayingLevel: levelToDisplay
    };
}

const mapStateToProps = state => {
    return preparePlanks(state.planks, state.levels.levels, state.levels.customLevels, state.levels.choosenLevelId)
}

const mapDispatchToProps = dispatch => {
    return {
        chooseTrainingItems: (items, name) => dispatch(TrainingActions.chooseTrainingItems(items, name))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StartTrainingScreen);