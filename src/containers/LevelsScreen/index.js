import React, { Component } from 'react';
import { View, FlatList, SectionList, Text, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import LevelItem from '../../components/LevelItem';
import * as LevelsActions from '../../actions/LevelsActions';

export class LevelsScreen extends Component {
    constructor(props) {
        super(props);
        this.onLevelDeleted = this.onLevelDeleted.bind(this);
        this.onLevelChoosen = this.onLevelChoosen.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.getSections = this.getSections.bind(this);
    }

    onLevelDeleted(id) {
        this.props.deleteById(id);
    }

    componentDidMount() {
        this.props.findAllCustom();
    }

    onLevelChoosen(id) {
        this.props.chooseLevel(id);
        this.props.navigation.navigate('StartTrainingScreen');
    }

    getSections() {
        return [
            {
                title: "Własne treningi",
                data: this.props.levels.customLevels
            },
            {
                title: "Standardowe treningi",
                data: this.props.levels.levels
            }
        ]
    }

    renderHeader(props) {
        return <Text style={styles.listTitle}>{props.section.title}</Text>
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
                            onPress={this.onLevelChoosen}
                            {...props} 
                        />
                    }
                    renderSectionHeader={(props) => this.renderHeader(props)}
                />
                {this.props.isLoading && 
                <View style={{elevation:2, zIndex: 900, flex:1, width: "100%", height: "100%", position: 'absolute', alignItems: "center", justifyContent: "center", backgroundColor:"#00000077"}}>
                    <Spinner color="red" />
                </View>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1
    }, 
    listTitle: {
        padding: 10,
        fontSize: 24,
        fontWeight: "bold"
    }
});

const mapStateToProps = state => {
    return {
        planks: state.planks,
        levels: state.levels,
        isLoading: state.levels.isFethingCustom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseLevel: (id) => dispatch(LevelsActions.chooseLevel(id)),
        findAllCustom: () => dispatch(LevelsActions.findAllCustom()),
        insert: (level) => dispatch(LevelsActions.insert(level)),
        deleteById: (id) => dispatch(LevelsActions.deleteById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelsScreen);