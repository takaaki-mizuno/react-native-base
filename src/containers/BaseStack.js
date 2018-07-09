// @flow
import React from 'react';
import { StackNavigator } from 'react-navigation';
import Routes, { StackRoutes } from './Routes';
import Drawer from './Drawer';
import Tab from './Tab';
import Tutorial from '../screens/Tutorial';

import { config } from '../helpers';

export default (SessionStore, SettingStore) => {
    const routes = {
        ...Routes,
        ...StackRoutes,
    };
    let initialRouteName = 'Root';
    const navigationType = config('navigation.type', 'drawer');
    const hasTutorial = config('navigation.hasTutorial', false);

    if (navigationType === 'drawer') {
        routes['Root'] = {
            screen: Drawer,
            path: 'root',
        };
    } else if (navigationType === 'tab') {
        routes['Root'] = {
            screen: Tab,
            path: 'root',
        };
    }
    if (SessionStore.isSignedIn()) {
        initialRouteName = 'Root';
    } else if (hasTutorial) {
        routes['Tutorial'] = {
            screen: Tutorial,
            path: 'tutorial',
        };
        initialRouteName = 'Tutorial';
    } else {
        initialRouteName = 'Login';
    }

    return StackNavigator(routes, {
        initialRouteName: initialRouteName,
        headerMode: 'none',
    });
};
