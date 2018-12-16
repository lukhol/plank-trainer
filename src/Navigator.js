import React, { Component } from 'react';
import {
     createDrawerNavigator, 
     createSwitchNavigator, 
     createBottomTabNavigator,
     createTabNavigator,
     createAppContainer, 
     createStackNavigator 
} from "react-navigation";

import LevelsScreen from './containers/LevelsScreen';
import HistoryScreen from './containers/HistoryScreen';
import CustomTrainingScreen from './containers/CustomTrainingScreen';
import SplashScreen from './containers/SplashScreen';
import StartTrainingScreen from './containers/StartTrainingScreen';
import TrainingScreen from './containers/TrainingScreen';
import i18n from './translations/i18n';

const rootNavigation = createTabNavigator(
    {
        LevelsScreen: { 
            screen: LevelsScreen, 
            navigationOptions: {  
                title: i18n.t('levelsScreen.title')  
            }
        },
        CustomTrainingScreen: { 
            screen: CustomTrainingScreen, 
            navigationOptions: {
                title: i18n.t('customTrainingScreen.title')  
            }
        },
        HistoryScreen: { 
            screen: HistoryScreen, 
            navigationOptions: {
                title: i18n.t('historyScreen.title') 
            }  
        },
    }
);

const rootStackNavigation = createStackNavigator(
    {   
        RootScreen: { screen: rootNavigation, navigationOptions: { header: null } },
        StartTrainingScreen: { 
            screen: StartTrainingScreen,
            navigationOptions: {
                title: i18n.t('startTrainingScreen.title'),
            }
        }, 
        TrainingScreen: {
            screen: TrainingScreen,
            navigationOptions: {
                title: "Training"
            }
        }
    }
)

const initStack = createSwitchNavigator(
    {
        SplashScreen: { screen: SplashScreen },
        RootScreen: { screen : rootStackNavigation },
    }
);

export default initStack;