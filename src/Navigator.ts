import {createStackNavigator, createSwitchNavigator, createTabNavigator} from "react-navigation";

import LevelsScreen from './containers/LevelsScreen';
import HistoryScreen from './containers/HistoryScreen';
import CustomTrainingScreen from './containers/CustomTrainingScreen';
import SplashScreen from './containers/SplashScreen';
import StartTrainingScreen from './containers/StartTrainingScreen';
import TrainingScreen from './containers/TrainingScreen';
import SettingsScreen from './containers/SettingsScreen';
import i18n from './translations/i18n';
import Colors from './common/colors';

const headerStyle = {
    backgroundColor: Colors.PRIMARY,
    color: '#fff',
    headerTintColor: '#fff'
};

const headerTitleStyle = {
    fontSize: 16,
    color: "#fff"
};

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
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                title: i18n.t('settingsScreen.title')
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: '#000',
            labelStyle: {
                fontSize: 12,
                color: "#fff"
            },
            style: {
                backgroundColor: '#7646ff',
            },
            indicatorStyle: {
                backgroundColor: '#fff',
            }
        },
        tabBarPosition: "top",
        //allowFontScaling: true
    }
);

const rootStackNavigation = createStackNavigator(
    {
        RootScreen: {
            screen: rootNavigation,
            navigationOptions: {header: null}
        },
        StartTrainingScreen: {
            screen: StartTrainingScreen,
            navigationOptions: {
                title: i18n.t('startTrainingScreen.title'),
                headerStyle: headerStyle,
                headerTitleStyle: headerTitleStyle,
                headerTintColor: Colors.ARROW //Arrow
            }
        },
        TrainingScreen: {
            screen: TrainingScreen,
            navigationOptions: {
                title: i18n.t('trainingScreen.title'),
                headerStyle: headerStyle,
                headerTitleStyle: headerTitleStyle,
                headerTintColor: Colors.ARROW //Arrow
            }
        },
        SettingsScreen: {
            screen: SettingsScreen,
            navigationOptions: {
                title: i18n.t('settingsScreen.title'),
                headerStyle: headerStyle,
                headerTitleStyle: headerTitleStyle,
                headerTintColor: Colors.ARROW //Arrow
            }
        }
    }
);

const initStack = createSwitchNavigator(
    {
        SplashScreen: {screen: SplashScreen},
        RootScreen: {screen: rootStackNavigation},
    }
);

export default initStack;