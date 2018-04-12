import * as React from "react";
import {
    Content,
} from "native-base";

import Styles from "./Styles";
import BaseScreen from "../Base/Screen";

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
            </Content>
        );
    }
}

export default HomeScreen;
