// @flow
import * as React from "react";
import {reaction, action, extendObservable} from "mobx";
import {persist} from 'mobx-persist'
import BaseStore from "./BaseStore"
import {config} from "../helpers";
import {AsyncStorage} from "react-native";

class SettingStore extends BaseStore {

    async getStorage() {
        const list = await AsyncStorage.getAllKeys();
        console.log(list);
    }

    constructor() {
        super();
        const settingGroups = config('settings.groups', []);
        const observables = {};
        for (const settingGroup of settingGroups) {
            for (const settingItem of settingGroup.items) {
                observables[settingItem.name] = settingItem.defaultValue;
            }
        }

        extendObservable(this, observables);
        for (let [key, value] of Object.entries(observables)) {
            persist(this[key])(this);
            reaction(
                () => this[key],
                (data) => {
                    if (this.rehydrate) {
                        this.rehydrate().then(() => {
                            this.getStorage();
                            console.log(key + ' Changed to ' + data + '. Setting Store Rehydrated')
                        })
                    }
                }
            );
        }

    }

    @action
    updateSetting(name, value) {
        console.log(name + ":" + this[name] + '->' + value);

        this[name] = value;
    }
}

export default SettingStore;
