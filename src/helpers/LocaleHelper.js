// @flow
import I18n from 'react-native-i18n';
import {config} from "./index"
import * as localeResources from "../resources/locale"

I18n.fallbacks = true;
I18n.defaultLocale = config('locale.default', 'en');
I18n.translations = {
    ...localeResources
};

class LocaleHelper {

    static getLocaleName()
    {
        const locale =  (I18n.locale && I18n.locale.toLowerCase()) || config('locale.default', 'en');
        const specialLocales = {
            'zh-hans': 'zh-cn',
            'zh-hans-cn': 'zh-cn',
            'zh-hans-sg': 'zh-cn',
            'zh-hans-hk': 'zh-hk',
            'zh-hant': 'zh-tw',
            'zh-hant-tw': 'zh-tw',
            'zh-hant-hk': 'zh-tw',
        };

        return specialLocales[locale] || locale;
    }


    static getText(key: string) {
        return I18n.t(key)
    }
}

export function locale (key: string) {
    return LocaleHelper.getText(key);
}

export default LocaleHelper;
