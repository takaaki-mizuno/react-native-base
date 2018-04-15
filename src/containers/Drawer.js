// @flow
import React from 'react';
import Routes from './Routes';
import { DrawerNavigator } from 'react-navigation';
import DrawerMenu from '../components/DrawerMenu';
import { config } from '../helpers';

export default (() => {
    const menu = config('menu');
    const items = {};
    const routes = [];
    for (const menuItem of menu) {
        const item = {};
        items[menuItem.name] = {
            screen: Routes[menuItem.name].screen,
            navigationOptions: {
                title: menuItem.title,
            },
        };
        routes.push(menuItem.name);
    }

    console.log(items);

    return DrawerNavigator(items, {
        initialRouteName: 'Home',
        contentComponent: props => <DrawerMenu {...props} />,
    });
})();
