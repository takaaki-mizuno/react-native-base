// @flow
import * as React from "react";
import {StyleSheet, View, TouchableWithoutFeedback, SafeAreaView} from "react-native";
import TabBarItem from "./TabBarItem";
import DeviceHelper from "../helpers/DeviceHelper";

export type Tab = {
    key: string,
    label: string,
    focusKey: string,
    onTabPress: Function,
};

export type Tabs = Tab[];

export type TabBarProps = NavigationProps<> & {
    tabs: Tabs
};

class TabBar extends React.Component<TabBarProps> {

    computeStyle() {
        return StyleSheet.create({
            container: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            tabs: {
                height: 44,
                width: DeviceHelper.getScreenWidth(),
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "stretch",
                backgroundColor: "#F7F7F7",
                borderTopWidth: StyleSheet.hairlineWidth,
                borderTopColor: "rgba(0, 0, 0, .3)",
            },
        });
    }

    render(): React.Node {
        const {tabs, navigation, focusKey, onTabPress} = this.props;
        console.log(navigation.state.index);
        console.log(tabs);
        const styles = this.computeStyle();
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.tabs}>
                    {
                        tabs.map(tab => (
                            <TabBarItem onPress={() => {onTabPress(tab.key)}} key={tab.key} tabKey={tab.key} focused={focusKey === tab.key} iconName={tab.icon}/>
                        ))
                    }
                </View>
            </SafeAreaView>
        );
    }
}

export default TabBar;
