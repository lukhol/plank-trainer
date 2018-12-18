import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/SettingsActions';
import * as HistoryActions from '../../actions/HistoryActions';

export class SplashScreen extends Component {
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

const mapStateToProps = state => {
    return {
        settings: state.settings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadSettings: () => dispatch(SettingsActions.load()),
        loadHistory: () => dispatch(HistoryActions.getAll())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);