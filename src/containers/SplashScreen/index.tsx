import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import globalStyles from '../../common/styles';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/SettingsActions';
import * as HistoryActions from '../../actions/HistoryActions';
import { Dispatch } from 'redux';
import { RootState } from '../../reducers';
import { Settings } from '../../models';

export interface SplashScreenProps {
    loadHistory(): void,
    loadSettings(): void,
    settings: Settings
    navigation: any
}

export class SplashScreen extends Component<SplashScreenProps> {
    componentDidMount() {
        this.props.loadHistory();
        this.props.loadSettings();
    }

    componentDidUpdate() {
        if(this.props.settings.loaded) {
            this.props.navigation.navigate('RootScreen');
        }
    }
    
    render() {
        return (
            <View style={globalStyles.centerContainer}>
                <ActivityIndicator 
                    color="green"
                    size="large" />
            </View>
        )
    }
}

const mapStateToProps = ({settings}: RootState) => ({
    settings
});

const mapDispatchToProps = {
    loadSettings: SettingsActions.load,
    loadHistory: HistoryActions.getAll
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(SplashScreen);