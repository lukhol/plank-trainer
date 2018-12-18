import React, { Component } from 'react';
import { View, Text, CheckBox, AppState } from 'react-native';
import { Picker  } from 'native-base';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/SettingsActions';
import SettingsPicker from '../../components/SettingsPicker';

export class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.soundChange = this.soundChange.bind(this);
        this.buildPickerData = this.buildPickerData.bind(this);
        this.readyDirationChanged = this.readyDirationChanged.bind(this);
        this.defaultWaitTimeChanged = this.defaultWaitTimeChanged.bind(this);
        this.state = {
            loaded: this.props.settings.loaded, 
            defaultWaitTime: this.props.settings.defaultWaitTime,
            gender: this.props.settings.gender, 
            sound: this.props.settings.sound, 
            readyDuration: this.props.settings.readyDuration
        }
    }

    soundChange() {
        this.props.saveSettings({
            ...this.state,
            sound: !this.state.sound
        });
        this.setState({sound: !this.state.sound});
    }

    readyDirationChanged(itemValue, index) {
        this.props.saveSettings({
            ...this.state,
            readyDuration: itemValue
        });
        this.setState({readyDuration: parseInt(itemValue)});
    }

    defaultWaitTimeChanged(itemValue, index) {
        this.props.saveSettings({
            ...this.state,
            defaultWaitTime: itemValue
        });
        this.setState({defaultWaitTime: parseInt(itemValue)});
    }

    buildPickerData() {
        const data = [];
        for(let i = 1 ; i <= 120 ; i++) {
            data.push({label: `${i} s`, value: i});
        }

        return data;
    }

    render() {
        return (
            <View style={globalStyles.container} style={{backgroundColor: "#fff"}}>
                <SettingsPicker
                    text="Czas trwania odpoczynku"
                    selectedValue={this.state.defaultWaitTime}
                    onValueChange={this.defaultWaitTimeChanged}
                    data={this.buildPickerData()}
                />
                <SettingsPicker
                    text="Odliczanie do startu"
                    selectedValue={this.state.readyDuration}
                    onValueChange={this.readyDirationChanged}
                    data={this.buildPickerData()}
                />
                <View style={{flexDirection: "row", borderBottomColor: "#3f3f3f", borderBottomWidth: 1, justifyContent: "space-between"}}>
                    <Text style={{alignSelf: "center"}}>
                        Dzwięk
                    </Text>
                    <CheckBox
                        value={this.state.sound}
                        onValueChange={this.soundChange}
                        />
                </View>
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
        saveSettings: settings => dispatch(SettingsActions.save(settings))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);