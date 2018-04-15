// @flow
import React from "react";
import {
    TabNavigator,
    StackNavigator,
} from 'react-navigation';
import {config} from "../helpers";
import Routes from "./Routes";
import TabBarItem from "../components/TabBarItem";
import TabBar from "../components/TabBar";

export default (() => {

    const menu = config('menu');
    const items = {};
    const routes = [];
    const tabs = [];

    for (const menuItem of menu) {
        const name = menuItem.name + 'Stack';
        routes.push(name);
    }

    let activeRouteKey = routes[0];

    for (i=0; i<menu.length; i++) {
        const menuItem = menu[i];
        const stack = StackNavigator(
            Routes,
            {
                initialRouteName: menuItem.name,
                headerMode: "none",
            }
        );

        const name = menuItem.name + 'Stack';
        items[name] = {
            screen: stack,
            navigationOptions:
                {
                    tabBarIcon: ({tintColor, focused}) => (
                        <TabBarItem
                            iconName={menuItem.icon}
                            focused={menuItem.name === activeRouteName}
                        />
                    ),
                    tabBarLabel: menuItem.label
                },
            index: i,
        };
        tabs.push({
            key: name,
            label: menuItem.label,
            icon: menuItem.icon,
        });
    }

    return TabNavigator(
        items,
        {
            lazy: true,
            tabBarComponent: ({jumpToIndex, ...props}) => {
                console.log(props);
                return (<TabBar onTabPress={(key)=>{
                    console.log(key);
                    const {navigation} = props;
                    if (activeRouteKey !== key) {
                        jumpToIndex(items[key].index);
                        activeRouteKey = key
                    }
                }} tabs={tabs} focusKey={activeRouteKey} {...props} />);
            },
            animationEnabled: false,
            swipeEnabled: false,
            /*
                        tabBarComponent: ({jumpToIndex, ...props}) => (
                            <TabBarBottom
                                {...props}
                                jumpToIndex={index => {
                                    const {dispatch, state} = props.navigation;
                                    const tappedRouteName = routes[index];
                                    console.log(activeRouteName + ' -> ' + tappedRouteName);
                                    if (tappedRouteName === activeRouteName ) {
                                        if( state.routes[index].routes.length > 1 ){
                                            dispatch(
                                                NavigationActions.reset({
                                                    index: 0,
                                                    actions: [
                                                        NavigationActions.navigate({routeName: tappedRouteName}),
                                                    ],
                                                })
                                            );
                                        }
                                    } else {
                                        jumpToIndex(index);
                                        activeRouteName = tappedRouteName;
                                    }
                                }}
                            />
                        ),
                    */
        }
    );
})();
