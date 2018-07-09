// @flow
import React from 'react';
import Login from '../screens/Login';
import Home from '../screens/Home';
import Setting from '../screens/Setting';
import WebView from '../screens/WebView';

const Routes = {
    Setting: {
        screen: Setting,
    },
    Home: {
        screen: Home,
    },
    WebView: {
        screen: WebView,
    },
};

export const StackRoutes = {
    Login: {
        screen: Login,
    },
};

export default Routes;
