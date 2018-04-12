// @flow
import React from "react";
import Login from "../screens/Login";
import Home from "../screens/Home";
import Setting from "../screens/Setting";
import WebView from "../screens/WebView";

const Routes = {
    Setting: {
        screen: Setting,
    },
    Login: {
        screen: Login,
    },
    Home: {
        screen: Home,
    },
    WebView : {
        screen: WebView,
    }
};

export default Routes;
