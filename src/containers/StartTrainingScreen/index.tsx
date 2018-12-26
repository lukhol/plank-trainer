import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import TrainingItem from '../../components/TrainingItem';
import * as TrainingActions from '../../actions/TrainingActions';
import { Button } from 'native-base';
import i18n from '../../translations/i18n';
import { Plank, Training } from '../../models';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { TrainingState } from '../../reducers/TrainingReducer';

export interface Props {
    planks: Plank[],
    displayingLevel: Training,
    chooseTrainingItems(planks: Plank[], name: string): any,
    navigation: any
}

export class StartTrainingScreen extends Component<Props> {
    render() {
        console.log('abc', this.props.planks);
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

function preparePlanks(allPlanks: Plank[], levels: Training[], customLevels: Training[], choosenLevelId: string) {
    let levelToDisplay = levels.find((item: Training) => item.id === choosenLevelId);
    if(!levelToDisplay) {
        //If not found in default search in custom
        levelToDisplay = customLevels.find((item: Training) => item.id === choosenLevelId) as Training; //may produce undefined error
    }
    let planks = levelToDisplay.planks;
    const propsPlanks = [];
    for(let i = 0 ; i < planks.length ; i ++) {
        const foundItem = allPlanks.find((item: Plank) => item.id === planks[i].imageName) as Plank;
        const newItem = {...foundItem, duration: planks[i].duration}
        if(foundItem) {
            propsPlanks.push(newItem);
        }
    }

    console.log({propsPlanks});
    return {
        computedPlanks: propsPlanks,
        displayingLevel: levelToDisplay
    };
}

const mapStateToProps = ({planks, levels}: RootState) => {
    const {computedPlanks, displayingLevel } = preparePlanks(planks, levels.levels, levels.customLevels, levels.choosenLevelId)
    return {
        planks: computedPlanks,
        displayingLevel
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
    chooseTrainingItems: (items: Plank[], name: string) => dispatch(TrainingActions.chooseTrainingItems(items, name))  
});

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
(StartTrainingScreen);