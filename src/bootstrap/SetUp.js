import * as React from "react";

import {observable, action} from "mobx";
import {Provider, observer} from "mobx-react/native";
import {StatusBar, AsyncStorage} from "react-native";
import {
    Root,
    Container,
    Content,
    Text
} from "native-base";
import {YellowBox} from 'react-native';

import App from "../containers/App";
import DeviceHelper from "../helpers/DeviceHelper";
import { create } from 'mobx-persist'

import RootStore from "../stores";
import Splash from "../components/Splash";

@observer
export default class Setup extends React.Component {

    @observable isReady = false;
    @action ready() {
        console.log("App becomes ready ");
        console.log(RootStore);
        this.isReady = true;
    }

    constructor() {
        super();

        // For Native Base
        YellowBox.ignoreWarnings([
            'Warning: componentWillReceiveProps is deprecated and will be removed in the next major version. Use static getDerivedStateFromProps instead.',
            'Warning: componentWillMount is deprecated and will be removed in the next major version. Use componentDidMount instead. As a temporary workaround, you can rename to UNSAFE_componentWillMount.',
            'Warning: isMounted(...) is deprecated in plain JavaScript React classes. Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks.',
            'Warning: componentWillUpdate is deprecated and will be removed in the next major version. Use componentDidUpdate instead. As a temporary workaround, you can rename to UNSAFE_componentWillUpdate.',
        ]);

    }

    async componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (DeviceHelper.isAndroid()) {
            StatusBar.setBackgroundColor("white");
        }

        const hydrate = create({
            storage: AsyncStorage
        });

        const list = await AsyncStorage.getAllKeys();
        console.log(list);

        const promises = [];
        const stores = RootStore.getStores();
        for (let [name, store] of Object.entries(stores)) {
            const result = hydrate(name, store);
            store.registerRehydrate(result.rehydrate);
            promises.push(result);
        }
        Promise.all(promises).then(() => this.ready()).catch(e => {
            console.warn(e)
        });
    }

    render() {
        if( !this.isReady ){
            return (
                <Root>
                    <Splash/>
                </Root>
            );
        }
        const stores = RootStore.getStores();
        return (
            <Provider {...stores}>
                <App/>
            </Provider>
        );
    }
}
