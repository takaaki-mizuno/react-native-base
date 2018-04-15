// @flow
import * as React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Icon from './Icon';
import { View } from 'native-base';

export type TabBarItemProps = {
    focused: any,
    iconName: string,
    onPress: Function,
    tabKey: string,
};

class TabBarItem extends React.PureComponent<TabBarItemProps> {
    static defaultProps = {
        focused: false,
    };

    computeStyle() {
        return StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
            },
            icon: {
                justifyContent: 'center',
                alignItems: 'center',
            },
            focused: {
                position: 'absolute',
                backgroundColor: '#000000',
                borderRadius: 2,
                top: 4,
                width: 68,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
            },
        });
    }

    render(): React.Node {
        const { focused, onPress, tabKey, iconName: name } = this.props;
        const computedStyle = this.computeStyle();
        if (focused) {
            return (
                <TouchableWithoutFeedback
                    onPress={() => {
                        onPress(tabKey);
                    }}
                >
                    <View style={computedStyle.container}>
                        <View style={computedStyle.focused} />
                        <Icon
                            size={24}
                            style={computedStyle.icon}
                            color="#ffffff"
                            {...{ name }}
                        />
                    </View>
                </TouchableWithoutFeedback>
            );
        }
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    onPress(tabKey);
                }}
            >
                <View style={computedStyle.container}>
                    <Icon
                        size={24}
                        style={computedStyle.icon}
                        color="#000000"
                        {...{ name }}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

export default TabBarItem;
