import React, { Component } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet } from 'react-native';
import globalStyles from '../../styles';
import { connect } from 'react-redux';
import { Button, Toast, Fab } from 'native-base';
import { CustomizeTrainingItem, PickableTrainingItem, OverflowLoader, H3, ValidateableInput } from '../../components';
import * as LevelsActions from '../../actions/LevelsActions';
import { sec2time } from '../../utils'
import { Padding } from '../../common/constants';
import Colors from '../../common/colors';
import Modal from 'react-native-modalbox';
import uuid from 'uuid/v4';
import SortableListView from 'react-native-sortable-listview';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome5';
import i18n from '../../translations/i18n';

export class CustomTrainingScreen extends Component {
    constructor(props) {
        super(props);
        this.saveTraining = this.saveTraining.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.getOveralTime = this.getOveralTime.bind(this);
        this.onItemPressed = this.onItemPressed.bind(this);
        this.increaseDuration = this.increaseDuration.bind(this);
        this.decreaseDuration = this.decreaseDuration.bind(this);
        this.planks = [...this.props.planks].map(item => {return {...item, duration: 0}});
        
        this.state = {
            name: '',
            planks: [],
            modalVisible: false,
            menuActive: false,
            isValid: false
        };

        this.index = 0;
    }

    openAddModal() {
        this.refs.modal1.open();
        this.setState({
            modalVisible: !this.state.modalVisible
        });
    }

    saveTraining() {
        const planksForLevel = this.state.planks.filter(item => item.duration > 0);
        const hasZeroDuration = this.state.planks.every((element, index, array) => element.duration === 0); 
        let message = '';

        if(this.state.name === '') {
            message += i18n.t('customTrainingScreen.errors.name');
        }

        if(planksForLevel === undefined || planksForLevel.length === 0) {
            message += i18n.t('customTrainingScreen.errors.noPlankChoosen');
        }

        if(hasZeroDuration) {
            message += i18n.t('customTrainingScreen.errors.zeroDurationPlanks');
        }

        if(message !== '') {
            Toast.show({
                text: message,
                buttonText: 'Ok',
                type: 'warning',
                duration: 6000
            });
            return;
        }
        
        let customLevel = {
            name: this.state.name,
            type: 'CUSTOM',
            planks: planksForLevel
        };

        this.props.insert(customLevel);
        this.props.navigation.navigate('LevelsScreen');

        this.setState({
            name: '',
            planks: [],
            modalVisible: false,
            menuActive: false,
            isValid: false
        });

        alert(i18n.t('customTrainingScreen.errors.levelAddedSuccessfully'));
    }

    onItemPressed(id) {
        const choosenPlank = {...this.planks.filter(item => item.id === id)[0]};
        if(choosenPlank) {
            choosenPlank.duration = 0;
            choosenPlank.imageName = choosenPlank.id;
            choosenPlank.id = uuid();
            this.setState({
                planks: [...this.state.planks, choosenPlank]
            });
            this.refs.modal1.close();
        }
    }

    increaseDuration(id) {
        this.setState({
            planks: this.state.planks.map(i => {
                if(i.id === id) {
                    const newDuration = (i.duration + 5);
                    return {...i, duration: newDuration};
                }

                return i;
            })
        });
    }

    decreaseDuration(id) {
        this.setState({
            planks: this.state.planks.map(i => {
                if(i.id === id) {
                    if(i.duration > 0) {
                        const newDuration = (i.duration - 5);
                        return {...i, duration: newDuration};
                    }
                }

                return i;
            })
        });
    }

    getOveralTime() {
        if(this.state.planks.length === 0) {
            return sec2time(0);
        }

        return sec2time(this.state.planks.map(i => i.duration).reduceRight((sum, item) => sum + item));
    }

    render() {
        return (
            <View style={globalStyles.container}>
                <View style={styles.infoContainer}>
                    <ValidateableInput
                        placeholder={i18n.t('customTrainingScreen.messages.levelNameInputPlaceholder')}
                        onChangeText={name => this.setState({name, isValid: name === '' ? false : true})}
                        value={this.state.name}
                        style={styles.textInput}
                        isValid={this.state.isValid}
                        errorMessage={i18n.t('customTrainingScreen.errors.nameValidationMessage')}
                    />
                    <Text style={styles.overalTime}>
                        <H3 style={{color: "#eee"}}>
                            {i18n.t('customTrainingScreen.messages.overalTime')} {this.getOveralTime()}
                        </H3>
                    </Text>
                </View>
                <SortableListView 
                    style={{flex:1}} 
                    data={this.state.planks}
                    renderRow={(props) => 
                        <CustomizeTrainingItem 
                            {...props} 
                            onPress={this.onItemPressed}
                            decrease={this.decreaseDuration}
                            increase={this.increaseDuration}
                        />}
                    onRowMoved={e => {
                        const testPlanks = [...this.state.planks];
                        testPlanks.splice(e.to, 0, testPlanks.splice(e.from, 1)[0]);
                        this.setState({planks: testPlanks});
                    }}
                />
                {this.props.isLoading && <OverflowLoader />}
                <Modal 
                    ref={'modal1'}
                    style={styles.modal}
                    swipeToClose={false}
                    position="center"
                >
                    <View style={{flex: 1}}>
                        <FlatList 
                            style={{flex:1}} 
                            data={this.planks}
                            renderItem={(props) => 
                                <PickableTrainingItem 
                                    {...props} 
                                    onPress={this.onItemPressed}
                                />
                        } />
                    </View>
                </Modal>
                <Fab
                    active={this.state.menuActive}
                    direction="up"
                    containerStyle={{ }}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setState({ menuActive: !this.state.menuActive })}>
                        <IconFontAwesome name="cog" />
                        <Button style={{ backgroundColor: '#34A34F' }} onPress={this.openAddModal}>
                            <IconFontAwesome name="plus" size={20} color="#fff" />
                        </Button>
                        <Button style={{ backgroundColor: '#3B5998' }} onPress={this.saveTraining}>
                            <IconFontAwesome name="save" size={20} color="#fff" />
                        </Button>
                </Fab>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        borderRadius: 3,
        shadowRadius: 3,
        width: "80%",
        height: "90%",
        zIndex: 500,
        elevation: 10
    },
    textInput: {
        borderBottomWidth: 1,
        fontWeight: "bold", 
        padding: Padding.SM, 
        borderColor: "white", 
        margin: Padding.MD, 
        marginBottom: 0, 
        ...globalStyles.textButton
    },
    overalTime: {
        margin: Padding.MD, 
        padding: Padding.SM, 
        marginTop: 0
    },
    infoContainer: {
        backgroundColor: Colors.PRIMARY_LIGHT
    }
});

const mapStateToProps = state => {
    return {
        planks: state.planks,
        isLoading: state.levels.isFethingCustom
    }
}

const mapDispatchToProps = dispatch => {
    return {
        insert: (level) => dispatch(LevelsActions.insert(level))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTrainingScreen);