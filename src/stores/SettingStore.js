// @flow
import * as React from "react";
import {observable, action, extendObservable} from "mobx";
import {persist} from 'mobx-persist'
import BaseStore from "./BaseStore"
import {config} from "../helpers";

class SettingStore extends BaseStore {
    @persist @observable someFlag = 'test';

    constructor() {
        super();
        const settingGroups = config('settings.groups', []);
        const obaservables = {};
        for (const settingGroup of settingGroups) {
            for (const settingItem of settingGroup.items) {
                obaservables[settingItem.name] = settingItem.defaultValue;
            }
        }

        extendObservable(this, obaservables);
        for (let [key, value] of Object.entries(obaservables)) {
            persist(this[key]);
        }
    }

    @action
    updateSetting(name, value) {
        console.log(name + ":" + this[name] + '->' + value);

        this[name] = value;
    }
}

export default SettingStore;
