import * as React from "react";
import {
    View,
    Text
} from "native-base";
import {
    DrawerItems
} from 'react-navigation';
import {ScrollView} from "react-native";

import {config} from "../helpers/ConfigurationHelper";

class DrawerMenu extends React.Component {

    getHeader() {
        if (config('navigation.drawer.showUserInfo', false)) {
            return (
                <View style={{padding: 16,}}>
                    <Text style={{fontSize: 24}}>DRAWER TEST</Text>
                </View>
            );
        }
        return "";
    }

    render() {
        const header = this.getHeader();
        return (
            <ScrollView>
                {header}
                <DrawerItems {...this.props} />
            </ScrollView>
        );
    }
}

export default DrawerMenu;
