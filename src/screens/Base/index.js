// @flow
import * as React from "react";
import Screen from "./Screen";
import Store from "./Store";
import {Provider, observer} from "mobx-react/native";

@observer
class Base extends React.Component {
    render() {
        return (
            <Provider ScreenStore={new Store()} {...props}>
                <Screen/>
            </Provider>
        );
    }
}

export default Base;
