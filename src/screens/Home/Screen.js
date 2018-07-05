import * as React from "react";
import {
    Content,
} from "native-base";
import {StyleSheet, View} from "react-native";

import Styles from "./Styles";
import BaseScreen from "../Base/Screen";
import {Button} from "../../components";
import {locale} from "../../helpers"

class HomeScreen extends BaseScreen {

    getTitle() {
        return "Home";
    }

    getStyles() {
        return Styles;
    }

    getContent() {
        return (
            <Content>
                <View style={{top:100}}>
                    <Button iconName='home' label={locale('test')}/>
                </View>
            </Content>
        );
    }
}

export default HomeScreen;
