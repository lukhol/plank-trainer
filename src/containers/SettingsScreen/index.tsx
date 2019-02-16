import React, { Component } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import globalStyles from '../../common/styles';
import { connect } from 'react-redux';
import * as SettingsActions from '../../actions/SettingsActions';
import { ListItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { IconSize, Padding } from '../../common/constants';
import { H5, SettingsPicker } from '../../components';
import i18n from '../../translations/i18n';
import { Settings } from '../../models';
import { RootState } from '../../reducers';
import { Item } from '../../components/SettingsPicker';

export interface Props {
    settings: Settings,
    saveSettings(settings: Settings): void
}

export interface Settings {
    defaultWaitTime: number,
    readyDuration: number,
    sound: boolean
}

export class SettingsScreen extends Component<Props, Settings> {
    constructor(props: Props) {
        super(props);
        this.soundChange = this.soundChange.bind(this);
        this.buildPickerData = this.buildPickerData.bind(this);
        this.readyDurationChanged = this.readyDurationChanged.bind(this);
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

    readyDurationChanged(itemValue: string, index: number) {
        this.props.saveSettings({
            ...this.state,
            readyDuration: parseInt(itemValue)
        });
        this.setState({readyDuration: parseInt(itemValue)});
    }

    defaultWaitTimeChanged(itemValue: string, index: number) {
        this.props.saveSettings({
            ...this.state,
            defaultWaitTime: parseInt(itemValue)
        });
        this.setState({defaultWaitTime: parseInt(itemValue)});
    }

    buildPickerData(): Item[] {
        const data = [];
        for(let i = 1 ; i <= 120 ; i++) {
            data.push({label: `${i} s`, value: i.toString()});
        }

        return data;
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <View style={styles.sectionTitle}>
                    <H5>{i18n.t('settingsScreen.timeTitle')}</H5>
                </View>
                <View style={styles.section}>
                    <ListItem icon style={styles.listItem}>
                        <SettingsPicker
                            text={i18n.t('settingsScreen.restDuration')}
                            selectedValue={this.state.defaultWaitTime.toString()}
                            onValueChange={this.defaultWaitTimeChanged}
                            data={this.buildPickerData()}
                            iconName="pause-circle"
                        />
                    </ListItem>
                    <ListItem icon style={styles.listItem}>
                        <SettingsPicker
                            text={i18n.t('settingsScreen.beforeStartCount')}
                            selectedValue={this.state.readyDuration.toString()}
                            onValueChange={this.readyDurationChanged}
                            data={this.buildPickerData()}
                            iconName="running"
                        />
                    </ListItem>
                </View>
                <View style={styles.sectionTitle}>
                    <H5>{i18n.t('settingsScreen.soundTitle')}</H5>
                </View>
                <View style={styles.section}>
                    <ListItem icon style={styles.listItem}>
                        <View style={{flex:1, flexDirection: "row", justifyContent: "space-between"}}>
                            <View style={globalStyles.startContainer}>
                                <Icon name="music" size={IconSize.MD} color="#000" />
                            </View>
                            <View style={globalStyles.centerContainer}>
                                <Text>
                                    {i18n.t('settingsScreen.sound')}
                                </Text>
                            </View>
                            <View style={globalStyles.endContainer}>
                                <Switch
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
});

const mapStateToProps = ({settings}: RootState) => ({
    settings
});

const mapDispatchToProps = {
    saveSettings: SettingsActions.save
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps)
(SettingsScreen);