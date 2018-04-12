// @flow
import * as React from "react";
import Screen from "./Screen";
import Store from "./Store";
import Base from "../Base";
import {Provider, observer} from "mobx-react/native";

@observer
class WebView extends Base {
    render() {
        return (
            <Provider ScreenStore={new Store()} {...this.props}>
                <Screen/>
            </Provider>
        );
    }
}

export default WebView;
