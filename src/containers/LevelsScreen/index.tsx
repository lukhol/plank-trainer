import React, { Component, ReactElement } from 'react';
import { View, SectionList, Text, StyleSheet, SectionListData } from 'react-native';
import { connect } from 'react-redux';
import * as LevelsActions from '../../actions/LevelsActions';
import { Padding } from '../../common/constants';
import i18n from '../../translations/i18n';
import { OverflowLoader, LevelItem } from '../../components';
import { Training, Plank } from '../../models';
import { RootState } from '../../reducers';
import { LevelState } from '../../reducers/LevelsReducer';

export interface LevelsScreenProps {
    planks: Array<Plank>,
    levels: LevelState,
    isLoading: boolean,
    deleteById: (id: string) => void,
    findAllCustom: () => void,
    chooseLevel: (id: string) => void,
    navigation: any
}

export class LevelsScreen extends Component<LevelsScreenProps> {
    constructor(props: LevelsScreenProps) {
        super(props);
        this.onLevelDeleted = this.onLevelDeleted.bind(this);
        this.onLevelChoose = this.onLevelChoose.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.getSections = this.getSections.bind(this);
    }

    onLevelDeleted(id: string) {
        this.props.deleteById(id);
    }

    componentDidMount() {
        this.props.findAllCustom();
    }

    onLevelChoose(id: string) {
        this.props.chooseLevel(id);
        this.props.navigation.navigate('StartTrainingScreen');
    }

    getSections(): SectionListData<Training>[] {
        return [
            {
                title: i18n.t('levelsScreen.customLevelsTitle'),
                data: this.props.levels.customLevels
            },
            {
                title: i18n.t('levelsScreen.standardTrainingTitle'),
                data: this.props.levels.levels
            }
        ]
    }

    renderHeader({section}: {section: SectionListData<Training>}): ReactElement<Text> | null {
        return <Text style={styles.listTitle}>{section.title}</Text>
    }

    render() {
        return (
            <View style={styles.container}>
                <SectionList
                    style={{flex:1}}
                    sections={this.getSections()}
                    keyExtractor={(item, index) => item.id}
                    renderItem={(props) => 
                        <LevelItem 
                            onDelete={this.onLevelDeleted}
                            onPress={this.onLevelChoose}
                            {...props} 
                        />
                    }
                    renderSectionHeader={this.renderHeader}
                />
                {this.props.isLoading && <OverflowLoader />}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    listTitle: {
        padding: Padding.MD,
        paddingBottom: Padding.SM,
        fontSize: 20,
        fontWeight: "bold"
    }
});

const mapStateToProps = ({planks, levels}: RootState) => ({
    planks: planks,
    levels: levels,
    isLoading: levels.isFetchingCustom
});

const mapDispatchToProps = {
    chooseLevel: LevelsActions.chooseLevel,
    findAllCustom: LevelsActions.findAllCustom,
    deleteById: LevelsActions.deleteById
};

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LevelsScreen);