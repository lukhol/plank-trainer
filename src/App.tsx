import React from 'react';
import {Provider} from 'react-redux';
import createStore from './common/store';
import Navigator from './Navigator';
import {initI18n} from './translations/i18n';
import {Root} from "native-base";

//Untyped modules
const RNLanguages = require('react-native-languages');

export default class App extends React.Component {
    componentDidMount() {
        initI18n(RNLanguages);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Provider store={createStore({})}>
                <Root>
                    <Navigator/>
                </Root>
            </Provider>
        );
    }
}