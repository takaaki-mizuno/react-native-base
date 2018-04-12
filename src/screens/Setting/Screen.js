import * as React from "react";
import {
    Content,
} from "native-base";
import {inject} from "mobx-react";
import {observer} from "mobx-react/native";
import autobind from "autobind-decorator";
import SettingsList from 'react-native-settings-list';

import Styles from "./Styles";
import BaseScreen from "../Base/Screen";

import {config} from "../../helpers";
import NavigationHelper from "../../helpers/NavigationHelper";

@inject('SettingStore', 'navigation')
@observer
class Screen extends BaseScreen {

    getTitle() {
        return "Settings";
    }

    getStyles() {
        return Styles;
    }

    handleValueChange(name, value) {
        const {SettingStore} = this.props;
        console.log("change: " + name + " to " + value);

        SettingStore.updateSetting(name, value);
    }

    handlePress(settingLink) {
        const {navigation} = this.props;

        console.log("open " + settingLink.name);
        NavigationHelper.openUrlWithWebView(settingLink.uri, settingLink.label, navigation);
    }

    generateSettingList() {
        const {SettingStore} = this.props;
        const settingGroups = config('settings.groups', []);
        const items = [];
        console.log(settingGroups);
        for (const settingGroup of settingGroups) {
            items.push(
                <SettingsList.Header key={"setting-header-" + settingGroup.name} headerText={settingGroup.label}/>
            );

            for (const settingItem of settingGroup.items) {
                switch (settingItem.type) {
                    case "boolean":
                        items.push(
                            <SettingsList.Item
                                key={"setting-item-" + settingItem.name}
                                hasNavArrow={false}
                                switchState={SettingStore[settingItem.name]}
                                switchOnValueChange={(value) => {
                                    this.handleValueChange(settingItem.name, value)
                                }}
                                hasSwitch={true}
                                title={settingItem.label}/>
                        );
                        break;
                }
            }
        }

        return items;
    }

    generateLinks() {
        const settingLinks = config('settings.urls', []);
        const items = [];
        if (settingLinks.length > 0) {
            items.push(
                <SettingsList.Header key="setting-url-header" headerText="Support"/>
            );
            for (const settingLink of settingLinks) {
                items.push(
                    <SettingsList.Item
                        key={"setting-url-" + settingLink.name}
                        hasNavArrow={true}
                        onPress={() => {
                            this.handlePress(settingLink)
                        }}
                        hasSwitch={false}
                        title={settingLink.label}/>
                );
            }
        }

        return items;
    }


    getContent() {
        const settingList = this.generateSettingList();
        const linkList = this.generateLinks();
        return (
            <Content>
                <SettingsList>
                    {settingList}
                    {linkList}
                </SettingsList>
            </Content>
        );
    }
}

export default Screen;
