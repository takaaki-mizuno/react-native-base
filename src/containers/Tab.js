// @flow
import React from "react";
import {
    TabNavigator,
    TabBarBottom,
    TabBarTop,
    StackNavigator,
    NavigationActions
} from 'react-navigation';
import {Icon} from 'native-base';
import {config} from "../helpers";
import Routes from "./Routes";

export default (() => {

    const menu = config('menu');
    const items = {};
    const routes = [];

    for (const menuItem of menu) {
        const stack = StackNavigator(
            Routes,
            {
                initialRouteName: menuItem.name,
                headerMode: "none",
            }
        );

        const item = {};
        items[menuItem.name] = {
            screen: stack,
            navigationOptions:
                {
                    tabBarIcon: ({tintColor}) => (
                        <Icon
                            containerStyle={{justifyContent: 'center', alignItems: 'center'}}
                            color={tintColor}
                            name={menuItem.icon}
                            size={33}
                        />
                    ),
                    tabBarLabel: menuItem.label
                },
        };
        routes.push(menuItem.name);
    }

    return TabNavigator(
        items,
        {
            lazy: true,
            tabBarPosition: 'bottom',
            tabBarOptions: {
                showLabel: false,
//                activeTintColor: colors.primaryDark,
//                inactiveTintColor: colors.grey,
                style: {
//                    backgroundColor: colors.alabaster,
                },
            },
            tabBarComponent: ({jumpToIndex, ...props}) => (
                <TabBarBottom
                    {...props}
                    jumpToIndex={index => {
                        const {dispatch, state} = props.navigation;

                        if (state.index === index && state.routes[index].routes.length > 1) {
                            const stackRouteName = routes[index];

                            dispatch(
                                NavigationActions.reset({
                                    index: 0,
                                    actions: [
                                        NavigationActions.navigate({routeName: stackRouteName}),
                                    ],
                                })
                            );
                        } else {
                            jumpToIndex(index);
                        }
                    }}
                />
            ),
        }
    );
})();

/*
export default TabNavigator(
    {
        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        color={tintColor}
                        name="home"
                        size={33}
                    />
                ),
            },
        },
        Notifications: {
            screen: NotificationsStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <NotificationIcon iconColor={tintColor} />
                ),
            },
        },
        Search: {
            screen: SearchStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        color={tintColor}
                        name="search"
                        size={33}
                    />
                ),
            },
        },
        MyProfile: {
            screen: MyProfileStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon
                        containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
                        color={tintColor}
                        name="person"
                        size={33}
                    />
                ),
            },
        },
    },
    {
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: colors.primaryDark,
            inactiveTintColor: colors.grey,
            style: {
                backgroundColor: colors.alabaster,
            },
        },
        tabBarComponent: ({ jumpToIndex, ...props }) => (
            <TabBarBottom
                {...props}
                jumpToIndex={index => {
                    const { dispatch, state } = props.navigation;

                    if (state.index === index && state.routes[index].routes.length > 1) {
                        const stackRouteName = [
                            'Events',
                            'Notifications',
                            'Search',
                            'MyProfile',
                        ][index];

                        dispatch(
                            NavigationActions.reset({
                                index: 0,
                                actions: [
                                    NavigationActions.navigate({ routeName: stackRouteName }),
                                ],
                            })
                        );
                    } else {
                        jumpToIndex(index);
                    }
                }}
            />
        ),
    }
);
*/
