// @flow
import appConfig from '../config/app';
import * as _ from 'lodash';

class ConfigurationHelper {
    static get(name: string, defaultValue = null) {
        return _.get(appConfig, name, defaultValue);
    }

    static getPageTitle(name: string) {
        const menu = this.get('menu');
        for (const menuItem of menu) {
            if (menuItem.name === name) {
                return menuItem.title;
            }
        }
        return '';
    }
}

export function config(name: string, defaultValue = null) {
    return ConfigurationHelper.get(name, defaultValue);
}


export default ConfigurationHelper;
