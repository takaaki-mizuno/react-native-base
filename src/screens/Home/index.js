// @flow
import * as React from "react";
import Base from "../Base";
import Screen from "./Screen"
import Store from "./Store";
import {Provider, observer} from "mobx-react/native";

@observer
class Home extends Base {
    render() {
        return (
            <Provider ScreenStore={new Store()} {...this.props}>
                <Screen/>
            </Provider>
        );
    }
}

export default Home;
