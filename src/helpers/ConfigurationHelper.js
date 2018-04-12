// @flow
import appConfig from "../config/app";
import * as _ from "lodash";

class ConfigurationHelper {
    static get(name: string, defaultValue = null) {
        return _.get(appConfig, name, defaultValue);
    }
}

export function config (name: string, defaultValue = null) {
    return ConfigurationHelper.get(name, defaultValue);
}

export default ConfigurationHelper;
