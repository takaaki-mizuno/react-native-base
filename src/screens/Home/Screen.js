import * as React from "react";
import {
    Content,
} from "native-base";
import {StyleSheet, View} from "react-native";

import Styles from "./Styles";
import BaseScreen from "../Base/Screen";
import RowButton from "../../components/Buttons/RowButton";
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
                    <RowButton iconName='home' label={locale('test')}/>
                </View>
            </Content>
        );
    }
}

export default HomeScreen;
