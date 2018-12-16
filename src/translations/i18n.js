import i18n from 'i18n-js';

import en from './en.json';
import pl from './pl.json';

export const initI18n = (RNLanguages) => {
    if(RNLanguages) {
        i18n.locale = RNLanguages.language;
    } else {
        i18n.locale = 'pl';
    }
    i18n.fallbacks = true;
    i18n.translations = { pl, en };
    return i18n;
}

export default initI18n();