import * as React from "react";
import {
    Content,
} from "native-base";
import {
    WebView,
    Linking,
} from "react-native";
import {inject} from "mobx-react";
import {observer} from "mobx-react/native";
import Styles from "./Styles";
import BaseScreen from "../Base/Screen";

import {config} from "../../helpers";

@inject('navigation')
@observer
class Screen extends BaseScreen {

    getTitle() {
        const {params} = this.props.navigation.state;
        return params.title || '';
    }

    getStyles() {
        return Styles;
    }

    getContent() {
        const {params} = this.props.navigation.state;
        const uri = params.uri;
        return (
            <Content>
                <WebView
                    ref={(ref) => {
                        this.webView = ref;
                    }}
                    source={{uri}}
                    onNavigationStateChange={(event) => {
                        if (event.url !== uri) {
                            this.webView.stopLoading();
                            Linking.openURL(event.url);
                        }
                    }}>
                </WebView>
            </Content>
        );
    }
}

export default Screen;
