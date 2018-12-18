import React, { Component } from 'react';
import { View, Text, CheckBox, Switch, AppState, StyleSheet } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/SettingsActions';
import SettingsPicker from '../../components/SettingsPicker';
import { ListItem, Left, Body, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconSize, Padding } from '../../common/constants';
import Colors from '../../common/colors';
import H4 from '../../components/H4';
import H5 from '../../components/H5';

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
            <View style={globalStyles.container}>
                <View style={styles.sectionTitle}>
                    <H5>Ustawienia czasowe</H5>
                </View>
                <View style={styles.section}>
                    <ListItem icon style={styles.listItem}>
                        <SettingsPicker
                            text="Czas trwania odpoczynku"
                            selectedValue={this.state.defaultWaitTime}
                            onValueChange={this.defaultWaitTimeChanged}
                            data={this.buildPickerData()}
                            iconName="pause-circle"
                        />
                    </ListItem>
                    <ListItem icon style={styles.listItem}>
                        <SettingsPicker
                            text="Odliczanie do startu"
                            selectedValue={this.state.readyDuration}
                            onValueChange={this.readyDirationChanged}
                            data={this.buildPickerData()}
                            iconName="running"
                        />
                    </ListItem>
                </View>
                <View style={styles.sectionTitle}>
                    <H5>Ustawienia dzwiękowe</H5>
                </View>
                <View style={styles.section}>
                    <ListItem icon style={styles.listItem}>
                        <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={globalStyles.startContainer}>
                                <Icon name="music" size={IconSize.MD} color="#000" />
                            </View>
                            <View style={globalStyles.centerContainer}>
                                <Text>
                                    Dzwięk
                                </Text>
                            </View>
                            <View style={globalStyles.endContainer}>
                                <CheckBox
                                    value={this.state.sound}
                                    onValueChange={this.soundChange}
                                />
                            </View>
                        </View>
                    </ListItem>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    listItem: {
        paddingRight: Padding.MD,
        borderBottomWidth: 1, 
        borderBottomColor: "#eee"
    }, 
    section: {
        backgroundColor: "#fff",
    }, 
    sectionTitle: {
        padding: Padding.MD
    }
})

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