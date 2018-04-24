// @flow
import * as React from "react";
import Base from "../Base";
import Screen from "./Screen"
import Store from "./Store";
import {Provider, observer} from "mobx-react/native";
import {getPageTitle} from '../../helpers';

@observer
class Home extends Base {
    render() {
        const title = getPageTitle(this.constructor.name);
        return (
            <Provider ScreenStore={new Store()} {...this.props}>
                <Screen title={title}/>
            </Provider>
        );
    }
}

export default Home;
