// @flow
import React from 'react';
import { Root } from 'native-base';
import autobind from 'autobind-decorator';
import BaseStack from './BaseStack';
import { inject, observer } from 'mobx-react';

@inject('SessionStore', 'SettingStore')
@observer
export default class App extends React.Component {
    getCurrentRouteName(navigationState) {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];

        if (route.routes) {
            return this.getCurrentRouteName(route);
        }

        return route.routeName;
    }

    @autobind
    handleNavigationStateChange(prev, next) {
        const routeName = this.getCurrentRouteName(next);

        //        const { translucent, backgroundColor, barStyle } = getStatusBarConfig(
        //            routeName
        //        );

        //        if (Platform.OS === 'android') {
        //            StatusBar.setTranslucent(translucent);
        //            StatusBar.setBackgroundColor(backgroundColor);
        //        }
        //        StatusBar.setBarStyle(barStyle);
    }

    render() {
        const { SessionStore, SettingStore } = this.props;
        const BaseStackElement = BaseStack(SessionStore, SettingStore);

        return (
            <Root>
                <BaseStackElement
                    onNavigationStateChange={this.handleNavigationStateChange}
                />
            </Root>
        );
    }
}
