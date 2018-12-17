import React, {Component} from 'react';
import { Provider } from 'react-redux';
import createStore from './store';
import Navigator from './Navigator';
import RNLanguages from 'react-native-languages';
import { initI18n } from './translations/i18n';
import { Root } from "native-base";

export default class App extends Component {
    componentDidMount() {
        initI18n(RNLanguages);
        console.disableYellowBox = true;
    }

    render() {
        return (
            <Provider store={createStore({})}>
                <Root>
                    <Navigator />
                </Root>
            </Provider>
        );
    }
}