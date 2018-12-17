import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import LevelItem from '../../components/LevelItem';
import * as LevelsActions from '../../actions/LevelsActions';

export class LevelsScreen extends Component {
    constructor(props) {
        super(props);
        this.onLevelChoosen = this.onLevelChoosen.bind(this);
    }

    componentDidMount() {
        this.props.findAllCustom();
    }

    onLevelChoosen(id) {
        this.props.chooseLevel(id);
        this.props.navigation.navigate('StartTrainingScreen');
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={{flex:1}}
                    data={this.props.levels.levels}
                    keyExtractor={(item, index) => ""+index}
                    renderItem={(props) => 
                        <LevelItem 
                            onPress={this.onLevelChoosen}
                            {...props} 
                        />
                    } 
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1
    }
});

const mapStateToProps = state => {
    return {
        planks: state.planks,
        levels: state.levels
    }
}

const mapDispatchToProps = dispatch => {
    return {
        chooseLevel: (id) => dispatch(LevelsActions.chooseLevel(id)),
        findAllCustom: () => dispatch(LevelsActions.findAllCustom()),
        insert: (level) => dispatch(LevelsActions.insert(level))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LevelsScreen);