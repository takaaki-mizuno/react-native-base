// @flow
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Icon from './Icon';
import { DeviceHelper } from '../helpers';

type ButtonProps = {
    onPress: () => mixed,
    disabled?: boolean,
    size: number,
    iconName?: string,
    iconColor: any,
    paddingTop: number,
    paddingBottom: number,
    paddingLeft: number,
    paddingRight: number,
    style: any,
};

class IconButton extends React.PureComponent<ButtonProps> {
    static defaultProps = {
        size: 32,
        paddingTop: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        paddingRight: 0,
        style: {},
        iconColor: 'primary',
    };

    computeStyle() {
        const {
            size,
            paddingTop,
            paddingBottom,
            paddingLeft,
            paddingRight,
        } = this.props;
        return StyleSheet.create({
            outer: {
                flex: 1,
                alignSelf: 'stretch',
                backgroundColor: 'transparent',
                width: size,
                height: size,
                ...{ paddingBottom, paddingLeft, paddingRight, paddingTop },
            },
            button: {
                backgroundColor: 'transparent',
                width: size,
                height: size,
            },
            inner: {
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'nowrap',
            },
            icon: {
                justifyContent: 'center',
                alignItems: 'center',
                width: size,
                height: size,
            },
        });
    }

    render(): React.Node {
        const {
            style,
            onPress,
            iconName,
            disabled,
            iconColor,
            size,
        } = this.props;
        let Touchable: React.ComponentType<
            *
        > = DeviceHelper.getTouchableElement(disabled);
        const computedStyle = this.computeStyle();
        return (
            <View style={[computedStyle.outer, style]}>
                <Touchable {...{ onPress }} style={computedStyle.button}>
                    <View style={computedStyle.icon}>
                        <Icon
                            color={iconColor}
                            size={Math.floor(size * 2 / 3)}
                            name={iconName}
                        />
                    </View>
                </Touchable>
            </View>
        );
    }
}

export default IconButton;
