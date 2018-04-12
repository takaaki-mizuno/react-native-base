// @flow
import * as React from "react";
import {NavigationActions, type NavigationNavigatorProps, type NavigationScreenProp} from "react-navigation";

class NavigationHelper {
    static reset(routeName: string, navigation: NavigationScreenProp<*>, key: string | null = null) {
        console.log('Reset To: ' + routeName);
        const action = NavigationActions.reset({
            index: 0,
            key,
            actions: [
                NavigationActions.navigate({routeName})
            ]
        });
        navigation.dispatch(action);
    }

    static navigate(routeName: string, navigation: NavigationScreenProp<*>, params = {}) {
        const action = NavigationActions.navigate({routeName: routeName, params: params});
        navigation.dispatch(action);
    }

    static openDrawer(navigation: NavigationScreenProp<*>) {
        console.log('Toggle Drawer');
        const action = NavigationActions.navigate({routeName: 'DrawerOpen'});
        navigation.dispatch(action);
    }

    static openUrlWithWebView(uri: string, title: string, navigation: NavigationScreenProp<*>) {
        console.log('Open URL:' + uri);
        NavigationHelper.navigate('WebView', navigation, {uri, title})
    }
}

export default NavigationHelper;
