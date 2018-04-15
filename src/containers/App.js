// @flow
import React from 'react';
import { Root, Container, Content, Text } from 'native-base';
import { inject } from 'mobx-react';
import autobind from 'autobind-decorator';
import BaseStack from './BaseStack';
import { observer } from 'mobx-react/native';

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
        return (
            <Root>
                <BaseStack
                    onNavigationStateChange={this.handleNavigationStateChange}
                />
            </Root>
        );
    }
}
